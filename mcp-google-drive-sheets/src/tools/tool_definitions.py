"""
MCP Tool handler implementations.

Each function corresponds to an MCP tool and orchestrates
the underlying drive/sheets/excel operations.
"""

import json
import logging

from src.auth.google_auth import get_credentials, build_drive_service, build_sheets_service
from src.drive.drive_ops import (
    list_spreadsheets,
    get_file_metadata,
    download_excel,
    upload_excel,
    convert_excel_to_gsheet,
    detect_file_type,
)
from src.sheets.sheets_ops import (
    read_range as sheets_read,
    write_range as sheets_write,
    append_rows as sheets_append,
    batch_update as sheets_batch,
)
from src.excel.excel_ops import (
    read_range as excel_read,
    write_range as excel_write,
)
from src.utils.backup import snapshot_sheet, snapshot_excel_file

logger = logging.getLogger("mcp_gdrive.tools")

# Lazy-initialized services
_creds = None
_drive = None
_sheets = None


def _init_services():
    global _creds, _drive, _sheets
    if _creds is None:
        _creds = get_credentials()
        _drive = build_drive_service(_creds)
        _sheets = build_sheets_service(_creds)
    return _drive, _sheets


# ── Drive Tools ──────────────────────────────────────────────────────────


def handle_drive_list_spreadsheets(
    query: str | None = None,
    folder_id: str | None = None,
) -> str:
    """Search for spreadsheets in Google Drive."""
    drive, _ = _init_services()
    files = list_spreadsheets(drive, query=query, folder_id=folder_id)

    results = []
    for f in files:
        file_type = "Google Sheets" if "spreadsheet" in f.get("mimeType", "") else "Excel (.xlsx)"
        results.append({
            "id": f["id"],
            "name": f["name"],
            "type": file_type,
            "modified": f.get("modifiedTime"),
        })

    return json.dumps(results, indent=2, ensure_ascii=False)


def handle_drive_get_file_metadata(file_id: str) -> str:
    """Get metadata of a file in Drive."""
    drive, _ = _init_services()
    meta = get_file_metadata(drive, file_id)
    return json.dumps(meta, indent=2, ensure_ascii=False)


# ── Sheets Tools ─────────────────────────────────────────────────────────


def handle_sheet_read_range(file_id: str, range: str) -> str:
    """Read data from a Google Sheet range."""
    _, sheets = _init_services()
    result = sheets_read(sheets, file_id, range)
    return json.dumps(result, indent=2, ensure_ascii=False)


def handle_sheet_write_range(
    file_id: str,
    range: str,
    values: list[list],
    dry_run: bool = False,
) -> str:
    """Write data to a Google Sheet range. Creates a backup first."""
    drive, sheets = _init_services()

    if not dry_run:
        backup_path = snapshot_sheet(sheets, file_id, range)
        logger.info("Backup created: %s", backup_path)

    result = sheets_write(sheets, file_id, range, values, dry_run=dry_run)
    return json.dumps(result, indent=2, ensure_ascii=False)


def handle_sheet_append_rows(
    file_id: str,
    sheet_name: str,
    rows: list[list],
    dry_run: bool = False,
) -> str:
    """Append rows to the end of a Google Sheet."""
    drive, sheets = _init_services()

    if not dry_run:
        backup_path = snapshot_sheet(sheets, file_id, f"{sheet_name}!A:ZZ")
        logger.info("Backup created: %s", backup_path)

    result = sheets_append(sheets, file_id, sheet_name, rows, dry_run=dry_run)
    return json.dumps(result, indent=2, ensure_ascii=False)


def handle_sheet_batch_update(
    file_id: str,
    operations: list[dict],
    dry_run: bool = False,
) -> str:
    """Execute multiple write operations atomically on a Google Sheet."""
    drive, sheets = _init_services()

    if not dry_run:
        for op in operations:
            snapshot_sheet(sheets, file_id, op["range"])

    result = sheets_batch(sheets, file_id, operations, dry_run=dry_run)
    return json.dumps(result, indent=2, ensure_ascii=False)


# ── Excel Tools ──────────────────────────────────────────────────────────


def handle_excel_read_range(
    file_id: str,
    sheet_name: str | None = None,
    range: str | None = None,
) -> str:
    """Read data from an Excel file stored in Drive."""
    drive, _ = _init_services()
    data = download_excel(drive, file_id)
    result = excel_read(data, sheet_name=sheet_name, range_str=range)
    return json.dumps(result, indent=2, ensure_ascii=False)


def handle_excel_write_range(
    file_id: str,
    sheet_name: str | None,
    range: str,
    values: list[list],
    dry_run: bool = False,
) -> str:
    """Write data to an Excel file in Drive. Downloads, edits, re-uploads."""
    drive, _ = _init_services()

    if not dry_run:
        snapshot_excel_file(drive, file_id)

    data = download_excel(drive, file_id)

    if dry_run:
        logger.info("[DRY RUN] Excel write to %s %s %s", file_id, sheet_name, range)
        return json.dumps({
            "dry_run": True,
            "file_id": file_id,
            "sheet_name": sheet_name,
            "range": range,
            "rows_to_write": len(values),
            "preview": values[:3],
        }, indent=2, ensure_ascii=False)

    modified = excel_write(data, sheet_name, range, values)
    upload_excel(drive, file_id, modified)

    return json.dumps({
        "file_id": file_id,
        "sheet_name": sheet_name,
        "range": range,
        "rows_written": len(values),
        "status": "uploaded",
    }, indent=2, ensure_ascii=False)


# ── Conversion Tools ─────────────────────────────────────────────────────


def handle_convert_excel_to_gsheet(file_id: str) -> str:
    """Convert an Excel file in Drive to a Google Sheets document."""
    drive, _ = _init_services()
    result = convert_excel_to_gsheet(drive, file_id)
    return json.dumps(result, indent=2, ensure_ascii=False)
