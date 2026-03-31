"""
Automatic backup / snapshot system.

Creates a snapshot before any write operation to allow rollback.
"""

import io
import json
import logging
from datetime import datetime, timezone
from pathlib import Path

from googleapiclient.http import MediaIoBaseDownload

logger = logging.getLogger("mcp_gdrive.backup")

BACKUP_DIR = Path(__file__).resolve().parent.parent.parent / "backups"


def ensure_backup_dir() -> Path:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    return BACKUP_DIR


def snapshot_sheet(sheets_service, file_id: str, range_name: str) -> Path:
    """
    Save a JSON snapshot of a Google Sheet range before modification.
    Returns the path to the snapshot file.
    """
    ensure_backup_dir()

    result = (
        sheets_service.spreadsheets()
        .values()
        .get(spreadsheetId=file_id, range=range_name)
        .execute()
    )
    values = result.get("values", [])

    ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    safe_range = range_name.replace("!", "_").replace(":", "-")
    filename = f"sheet_{file_id[:8]}_{safe_range}_{ts}.json"
    path = BACKUP_DIR / filename

    with open(path, "w") as f:
        json.dump({"file_id": file_id, "range": range_name, "values": values}, f, indent=2)

    logger.info("Snapshot saved: %s", path)
    return path


def snapshot_excel_file(drive_service, file_id: str) -> Path:
    """
    Download a full copy of an Excel file from Drive before modification.
    Returns the path to the backup file.
    """
    ensure_backup_dir()

    meta = drive_service.files().get(fileId=file_id, fields="name").execute()
    name = meta.get("name", file_id)

    ts = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    filename = f"excel_{file_id[:8]}_{ts}_{name}"
    path = BACKUP_DIR / filename

    request = drive_service.files().get_media(fileId=file_id)
    with open(path, "wb") as f:
        downloader = MediaIoBaseDownload(f, request)
        done = False
        while not done:
            _, done = downloader.next_chunk()

    logger.info("Excel backup saved: %s", path)
    return path
