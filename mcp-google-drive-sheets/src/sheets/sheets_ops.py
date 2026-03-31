"""
Google Sheets API operations: read, write, append, batch update.
"""

import logging

logger = logging.getLogger("mcp_gdrive.sheets")
audit = logging.getLogger("mcp_gdrive.audit")


def read_range(sheets_service, file_id: str, range_name: str) -> dict:
    """
    Read values from a Google Sheet range.
    Returns {"range": str, "values": list[list], "row_count": int}.
    """
    result = (
        sheets_service.spreadsheets()
        .values()
        .get(spreadsheetId=file_id, range=range_name)
        .execute()
    )
    values = result.get("values", [])
    logger.info(
        "Read %d rows from %s range '%s'", len(values), file_id, range_name
    )
    return {
        "range": result.get("range", range_name),
        "values": values,
        "row_count": len(values),
    }


def write_range(
    sheets_service,
    file_id: str,
    range_name: str,
    values: list[list],
    dry_run: bool = False,
) -> dict:
    """
    Write values to a Google Sheet range.
    If dry_run=True, validates but does not commit.
    """
    if not values:
        raise ValueError("values cannot be empty")

    if dry_run:
        logger.info("[DRY RUN] Would write %d rows to %s '%s'", len(values), file_id, range_name)
        return {
            "dry_run": True,
            "range": range_name,
            "rows_to_write": len(values),
            "preview": values[:3],
        }

    body = {"values": values}
    result = (
        sheets_service.spreadsheets()
        .values()
        .update(
            spreadsheetId=file_id,
            range=range_name,
            valueInputOption="USER_ENTERED",
            body=body,
        )
        .execute()
    )

    updated = result.get("updatedCells", 0)
    audit.info("WRITE | file=%s | range=%s | cells=%d", file_id, range_name, updated)
    logger.info("Wrote %d cells to %s '%s'", updated, file_id, range_name)

    return {
        "updated_range": result.get("updatedRange"),
        "updated_rows": result.get("updatedRows", 0),
        "updated_cells": updated,
    }


def append_rows(
    sheets_service,
    file_id: str,
    sheet_name: str,
    rows: list[list],
    dry_run: bool = False,
) -> dict:
    """
    Append rows to the bottom of a sheet.
    """
    if not rows:
        raise ValueError("rows cannot be empty")

    range_name = f"{sheet_name}!A1"

    if dry_run:
        logger.info("[DRY RUN] Would append %d rows to %s '%s'", len(rows), file_id, sheet_name)
        return {
            "dry_run": True,
            "sheet": sheet_name,
            "rows_to_append": len(rows),
            "preview": rows[:3],
        }

    body = {"values": rows}
    result = (
        sheets_service.spreadsheets()
        .values()
        .append(
            spreadsheetId=file_id,
            range=range_name,
            valueInputOption="USER_ENTERED",
            insertDataOption="INSERT_ROWS",
            body=body,
        )
        .execute()
    )

    updates = result.get("updates", {})
    updated_rows = updates.get("updatedRows", 0)
    audit.info("APPEND | file=%s | sheet=%s | rows=%d", file_id, sheet_name, updated_rows)
    logger.info("Appended %d rows to %s '%s'", updated_rows, file_id, sheet_name)

    return {
        "updated_range": updates.get("updatedRange"),
        "updated_rows": updated_rows,
        "updated_cells": updates.get("updatedCells", 0),
    }


def batch_update(
    sheets_service,
    file_id: str,
    operations: list[dict],
    dry_run: bool = False,
) -> dict:
    """
    Execute batch operations on a Google Sheet.

    Each operation is a dict: {"range": str, "values": list[list]}.
    All operations are applied atomically via batchUpdate.
    """
    if not operations:
        raise ValueError("operations list cannot be empty")

    if dry_run:
        logger.info("[DRY RUN] Would batch-update %d ranges on %s", len(operations), file_id)
        return {
            "dry_run": True,
            "operation_count": len(operations),
            "ranges": [op["range"] for op in operations],
        }

    data = []
    for op in operations:
        data.append({
            "range": op["range"],
            "values": op["values"],
        })

    body = {"valueInputOption": "USER_ENTERED", "data": data}
    result = (
        sheets_service.spreadsheets()
        .values()
        .batchUpdate(spreadsheetId=file_id, body=body)
        .execute()
    )

    total_cells = result.get("totalUpdatedCells", 0)
    audit.info(
        "BATCH_UPDATE | file=%s | ranges=%d | cells=%d",
        file_id,
        len(operations),
        total_cells,
    )
    logger.info("Batch updated %d ranges (%d cells) on %s", len(operations), total_cells, file_id)

    return {
        "total_updated_sheets": result.get("totalUpdatedSheets", 0),
        "total_updated_rows": result.get("totalUpdatedRows", 0),
        "total_updated_cells": total_cells,
    }
