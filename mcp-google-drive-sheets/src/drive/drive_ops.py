"""
Google Drive operations: search, metadata, download, upload.
"""

import io
import logging

from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload

logger = logging.getLogger("mcp_gdrive.drive")

# MIME types
MIME_GSHEET = "application/vnd.google-apps.spreadsheet"
MIME_XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"


def list_spreadsheets(
    drive_service,
    query: str | None = None,
    folder_id: str | None = None,
    page_size: int = 50,
) -> list[dict]:
    """
    List spreadsheets (Google Sheets + Excel) in Drive.
    Optionally filter by name query and/or parent folder.
    """
    mime_filter = (
        f"(mimeType='{MIME_GSHEET}' or mimeType='{MIME_XLSX}')"
    )
    parts = [mime_filter, "trashed=false"]

    if query:
        parts.append(f"name contains '{query}'")
    if folder_id:
        parts.append(f"'{folder_id}' in parents")

    q = " and ".join(parts)
    logger.info("Drive query: %s", q)

    results = (
        drive_service.files()
        .list(
            q=q,
            pageSize=page_size,
            fields="files(id, name, mimeType, modifiedTime, size, owners)",
            orderBy="modifiedTime desc",
        )
        .execute()
    )

    files = results.get("files", [])
    logger.info("Found %d spreadsheet files", len(files))
    return files


def get_file_metadata(drive_service, file_id: str) -> dict:
    """Get detailed metadata for a Drive file."""
    meta = (
        drive_service.files()
        .get(
            fileId=file_id,
            fields="id, name, mimeType, modifiedTime, size, owners, parents, webViewLink",
        )
        .execute()
    )
    logger.info("Metadata retrieved for file %s (%s)", meta.get("name"), file_id)
    return meta


def download_excel(drive_service, file_id: str) -> bytes:
    """Download an Excel file from Drive into memory."""
    request = drive_service.files().get_media(fileId=file_id)
    buffer = io.BytesIO()
    downloader = MediaIoBaseDownload(buffer, request)
    done = False
    while not done:
        _, done = downloader.next_chunk()
    logger.info("Downloaded Excel file %s (%d bytes)", file_id, buffer.tell())
    buffer.seek(0)
    return buffer.read()


def upload_excel(drive_service, file_id: str, data: bytes) -> dict:
    """Upload (overwrite) an Excel file on Drive."""
    import tempfile, os

    with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as tmp:
        tmp.write(data)
        tmp_path = tmp.name

    try:
        media = MediaFileUpload(tmp_path, mimetype=MIME_XLSX, resumable=True)
        result = (
            drive_service.files()
            .update(fileId=file_id, media_body=media)
            .execute()
        )
        logger.info("Uploaded Excel file %s", file_id)
        return result
    finally:
        os.unlink(tmp_path)


def convert_excel_to_gsheet(drive_service, file_id: str) -> dict:
    """
    Create a Google Sheets copy of an Excel file stored in Drive.
    The original file is kept intact.
    """
    meta = drive_service.files().get(fileId=file_id, fields="name, parents").execute()
    name = meta.get("name", "Converted")

    body = {
        "name": f"{name} (Google Sheets)",
        "mimeType": MIME_GSHEET,
    }
    if meta.get("parents"):
        body["parents"] = meta["parents"]

    copied = (
        drive_service.files()
        .copy(fileId=file_id, body=body)
        .execute()
    )
    logger.info(
        "Converted Excel %s → Google Sheet %s", file_id, copied.get("id")
    )
    return {
        "original_file_id": file_id,
        "new_file_id": copied["id"],
        "new_name": copied.get("name"),
    }


def detect_file_type(drive_service, file_id: str) -> str:
    """
    Return 'google_sheet' or 'excel' based on MIME type.
    Raises ValueError for unsupported types.
    """
    meta = drive_service.files().get(fileId=file_id, fields="mimeType").execute()
    mime = meta.get("mimeType", "")
    if mime == MIME_GSHEET:
        return "google_sheet"
    if mime == MIME_XLSX:
        return "excel"
    raise ValueError(f"Unsupported file type: {mime}")
