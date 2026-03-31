"""
MCP Server — Google Drive + Sheets + Excel integration.

Exposes tools for Claude to search, read, and write spreadsheets
stored in Google Drive (both Google Sheets and .xlsx).
"""

import asyncio
import json
import logging
import sys

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import (
    Tool,
    TextContent,
    CallToolResult,
)

from src.utils.logger import setup_logging
from src.tools.tool_definitions import (
    handle_drive_list_spreadsheets,
    handle_drive_get_file_metadata,
    handle_sheet_read_range,
    handle_sheet_write_range,
    handle_sheet_append_rows,
    handle_sheet_batch_update,
    handle_excel_read_range,
    handle_excel_write_range,
    handle_convert_excel_to_gsheet,
)

logger = setup_logging()

# ── Tool Definitions ─────────────────────────────────────────────────────

TOOLS = [
    Tool(
        name="drive_list_spreadsheets",
        description=(
            "Search for spreadsheet files (Google Sheets and Excel .xlsx) in Google Drive. "
            "Filter by name query and/or parent folder ID. "
            "Returns id, name, type, and last modified date."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "Search term to filter file names (optional)",
                },
                "folder_id": {
                    "type": "string",
                    "description": "Google Drive folder ID to restrict search (optional)",
                },
            },
        },
    ),
    Tool(
        name="drive_get_file_metadata",
        description=(
            "Get detailed metadata for a file in Google Drive: "
            "name, type, size, owner, last modified, web link."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Drive file ID",
                },
            },
            "required": ["file_id"],
        },
    ),
    Tool(
        name="sheet_read_range",
        description=(
            "Read values from a Google Sheets spreadsheet. "
            "Specify a range in A1 notation (e.g. 'Sheet1!A1:D10'). "
            "Returns the values as a 2D array plus row count."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Sheets spreadsheet ID",
                },
                "range": {
                    "type": "string",
                    "description": "Range in A1 notation, e.g. 'Sheet1!A1:D10'",
                },
            },
            "required": ["file_id", "range"],
        },
    ),
    Tool(
        name="sheet_write_range",
        description=(
            "Write values to a Google Sheets range. "
            "Automatically creates a backup snapshot before writing. "
            "Use dry_run=true to preview without committing changes."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Sheets spreadsheet ID",
                },
                "range": {
                    "type": "string",
                    "description": "Target range in A1 notation",
                },
                "values": {
                    "type": "array",
                    "items": {"type": "array"},
                    "description": "2D array of values to write (rows × columns)",
                },
                "dry_run": {
                    "type": "boolean",
                    "description": "If true, preview the operation without applying changes",
                    "default": False,
                },
            },
            "required": ["file_id", "range", "values"],
        },
    ),
    Tool(
        name="sheet_append_rows",
        description=(
            "Append new rows at the bottom of a Google Sheet tab. "
            "Automatically creates a backup before appending. "
            "Use dry_run=true to preview."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Sheets spreadsheet ID",
                },
                "sheet_name": {
                    "type": "string",
                    "description": "Name of the sheet tab to append to",
                },
                "rows": {
                    "type": "array",
                    "items": {"type": "array"},
                    "description": "Array of rows, each row being an array of values",
                },
                "dry_run": {
                    "type": "boolean",
                    "description": "If true, preview without applying",
                    "default": False,
                },
            },
            "required": ["file_id", "sheet_name", "rows"],
        },
    ),
    Tool(
        name="sheet_batch_update",
        description=(
            "Execute multiple write operations on a Google Sheet atomically. "
            "Each operation specifies a range and values. "
            "Backup snapshots are created for each affected range."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Sheets spreadsheet ID",
                },
                "operations": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "range": {"type": "string"},
                            "values": {"type": "array", "items": {"type": "array"}},
                        },
                        "required": ["range", "values"],
                    },
                    "description": "List of {range, values} operations",
                },
                "dry_run": {
                    "type": "boolean",
                    "description": "If true, preview without applying",
                    "default": False,
                },
            },
            "required": ["file_id", "operations"],
        },
    ),
    Tool(
        name="excel_read_range",
        description=(
            "Read values from an Excel (.xlsx) file stored in Google Drive. "
            "Downloads the file, reads the specified sheet and range, "
            "then returns the values as a 2D array."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Drive file ID of the .xlsx file",
                },
                "sheet_name": {
                    "type": "string",
                    "description": "Name of the worksheet (optional, defaults to active sheet)",
                },
                "range": {
                    "type": "string",
                    "description": "Range in A1 notation, e.g. 'A1:D10' (optional, reads all if omitted)",
                },
            },
            "required": ["file_id"],
        },
    ),
    Tool(
        name="excel_write_range",
        description=(
            "Write values to an Excel (.xlsx) file in Google Drive. "
            "Downloads the file, modifies it with openpyxl, and re-uploads. "
            "Automatically creates a backup before modification."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Drive file ID of the .xlsx file",
                },
                "sheet_name": {
                    "type": "string",
                    "description": "Name of the worksheet (optional, defaults to active sheet)",
                },
                "range": {
                    "type": "string",
                    "description": "Starting range in A1 notation, e.g. 'A1'",
                },
                "values": {
                    "type": "array",
                    "items": {"type": "array"},
                    "description": "2D array of values to write",
                },
                "dry_run": {
                    "type": "boolean",
                    "description": "If true, preview without applying",
                    "default": False,
                },
            },
            "required": ["file_id", "range", "values"],
        },
    ),
    Tool(
        name="convert_excel_to_gsheet",
        description=(
            "Convert an Excel (.xlsx) file in Drive to a new Google Sheets document. "
            "The original Excel file is preserved. "
            "Returns the new Google Sheet ID."
        ),
        inputSchema={
            "type": "object",
            "properties": {
                "file_id": {
                    "type": "string",
                    "description": "Google Drive file ID of the Excel file to convert",
                },
            },
            "required": ["file_id"],
        },
    ),
]

# ── Tool Dispatcher ──────────────────────────────────────────────────────

HANDLERS = {
    "drive_list_spreadsheets": lambda args: handle_drive_list_spreadsheets(
        query=args.get("query"),
        folder_id=args.get("folder_id"),
    ),
    "drive_get_file_metadata": lambda args: handle_drive_get_file_metadata(
        file_id=args["file_id"],
    ),
    "sheet_read_range": lambda args: handle_sheet_read_range(
        file_id=args["file_id"],
        range=args["range"],
    ),
    "sheet_write_range": lambda args: handle_sheet_write_range(
        file_id=args["file_id"],
        range=args["range"],
        values=args["values"],
        dry_run=args.get("dry_run", False),
    ),
    "sheet_append_rows": lambda args: handle_sheet_append_rows(
        file_id=args["file_id"],
        sheet_name=args["sheet_name"],
        rows=args["rows"],
        dry_run=args.get("dry_run", False),
    ),
    "sheet_batch_update": lambda args: handle_sheet_batch_update(
        file_id=args["file_id"],
        operations=args["operations"],
        dry_run=args.get("dry_run", False),
    ),
    "excel_read_range": lambda args: handle_excel_read_range(
        file_id=args["file_id"],
        sheet_name=args.get("sheet_name"),
        range=args.get("range"),
    ),
    "excel_write_range": lambda args: handle_excel_write_range(
        file_id=args["file_id"],
        sheet_name=args.get("sheet_name"),
        range=args["range"],
        values=args["values"],
        dry_run=args.get("dry_run", False),
    ),
    "convert_excel_to_gsheet": lambda args: handle_convert_excel_to_gsheet(
        file_id=args["file_id"],
    ),
}


# ── MCP Server Setup ─────────────────────────────────────────────────────

app = Server("mcp-google-drive-sheets")


@app.list_tools()
async def list_tools() -> list[Tool]:
    return TOOLS


@app.call_tool()
async def call_tool(name: str, arguments: dict) -> CallToolResult:
    handler = HANDLERS.get(name)
    if not handler:
        return CallToolResult(
            content=[TextContent(type="text", text=f"Unknown tool: {name}")],
            isError=True,
        )

    try:
        result_text = handler(arguments)
        return CallToolResult(
            content=[TextContent(type="text", text=result_text)]
        )
    except FileNotFoundError as e:
        return CallToolResult(
            content=[TextContent(type="text", text=f"Configuration error: {e}")],
            isError=True,
        )
    except ValueError as e:
        return CallToolResult(
            content=[TextContent(type="text", text=f"Validation error: {e}")],
            isError=True,
        )
    except Exception as e:
        logger.exception("Tool '%s' failed", name)
        return CallToolResult(
            content=[TextContent(type="text", text=f"Error in {name}: {type(e).__name__}: {e}")],
            isError=True,
        )


async def run():
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())


def main():
    asyncio.run(run())


if __name__ == "__main__":
    main()
