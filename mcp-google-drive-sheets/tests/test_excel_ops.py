"""Unit tests for Excel operations (no Google APIs needed)."""

import io
import pytest
from openpyxl import Workbook

from src.excel.excel_ops import read_range, write_range


def _make_test_xlsx() -> bytes:
    """Create a minimal test Excel file in memory."""
    wb = Workbook()
    ws = wb.active
    ws.title = "Proveedores"
    ws.append(["Proveedor", "Material", "Precio", "Margen"])
    ws.append(["AceroCorp", "Acero", 150.0, 0.22])
    ws.append(["MaderaSL", "Madera", 80.5, 0.35])
    ws.append(["PlastiMax", "Plástico", 45.0, 0.18])

    buf = io.BytesIO()
    wb.save(buf)
    buf.seek(0)
    return buf.read()


class TestExcelRead:
    def test_read_all(self):
        data = _make_test_xlsx()
        result = read_range(data, sheet_name="Proveedores")
        assert result["row_count"] == 4
        assert result["values"][0] == ["Proveedor", "Material", "Precio", "Margen"]

    def test_read_range(self):
        data = _make_test_xlsx()
        result = read_range(data, sheet_name="Proveedores", range_str="A1:B2")
        assert result["row_count"] == 2
        assert result["values"][0] == ["Proveedor", "Material"]
        assert result["values"][1] == ["AceroCorp", "Acero"]

    def test_read_invalid_sheet(self):
        data = _make_test_xlsx()
        with pytest.raises(ValueError, match="not found"):
            read_range(data, sheet_name="NoExiste")


class TestExcelWrite:
    def test_write_and_read_back(self):
        data = _make_test_xlsx()
        new_values = [["NuevoProv", "Vidrio", 200.0, 0.30]]
        modified = write_range(data, "Proveedores", "A5", new_values)

        result = read_range(modified, sheet_name="Proveedores")
        assert result["row_count"] == 5
        assert result["values"][4][0] == "NuevoProv"

    def test_dry_run_no_change(self):
        data = _make_test_xlsx()
        result = write_range(data, "Proveedores", "A5", [["X"]], dry_run=True)
        # dry_run returns original data unchanged
        check = read_range(result, sheet_name="Proveedores")
        assert check["row_count"] == 4  # unchanged

    def test_write_empty_raises(self):
        data = _make_test_xlsx()
        with pytest.raises(ValueError, match="empty"):
            write_range(data, "Proveedores", "A1", [])
