# MCP Google Drive + Sheets + Excel Server

Servidor MCP (Model Context Protocol) que permite a Claude buscar, leer y escribir archivos de Google Sheets y Excel (.xlsx) almacenados en Google Drive.

Diseñado para **Directores de Operaciones** que necesitan analizar márgenes, gestionar proveedores y automatizar reporting desde Claude.

---

## A. Estructura del Proyecto

```
mcp-google-drive-sheets/
├── pyproject.toml                     # Dependencias y build
├── claude_desktop_config.example.json # Config para Claude Desktop
├── .gitignore
├── README.md
├── config/
│   ├── credentials.example.json       # Plantilla OAuth (NO commitear el real)
│   ├── credentials.json               # ← Tu archivo real (gitignored)
│   ├── token.json                     # ← Generado automáticamente (gitignored)
│   └── settings.json                  # Configuración del servidor
├── src/
│   ├── server.py                      # Punto de entrada MCP
│   ├── auth/
│   │   └── google_auth.py             # OAuth 2.0 + builders de servicio
│   ├── drive/
│   │   └── drive_ops.py               # Operaciones Drive API
│   ├── sheets/
│   │   └── sheets_ops.py              # Operaciones Sheets API
│   ├── excel/
│   │   └── excel_ops.py               # Operaciones openpyxl
│   ├── tools/
│   │   └── tool_definitions.py        # Handlers de cada tool MCP
│   └── utils/
│       ├── logger.py                  # Logging centralizado + auditoría
│       └── backup.py                  # Sistema de snapshots automáticos
├── tests/
│   └── test_excel_ops.py              # Tests unitarios
├── backups/                           # Snapshots antes de escritura (gitignored)
└── logs/                              # Logs de actividad (gitignored)
```

---

## B. Configuración OAuth Paso a Paso

### 1. Crear proyecto en Google Cloud Console

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un nuevo proyecto (ej: `mcp-drive-sheets`)
3. Ve a **APIs & Services → Library**
4. Habilita estas dos APIs:
   - **Google Drive API**
   - **Google Sheets API**

### 2. Crear credenciales OAuth 2.0

1. Ve a **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth Client ID**
3. Tipo: **Desktop application**
4. Nombre: `MCP Server`
5. Descarga el JSON y guárdalo como `config/credentials.json`

### 3. Configurar pantalla de consentimiento

1. Ve a **OAuth consent screen**
2. Tipo: **External** (o Internal si usas Google Workspace)
3. Añade los scopes:
   - `https://www.googleapis.com/auth/spreadsheets`
   - `https://www.googleapis.com/auth/drive.file`
4. Añade tu email como usuario de prueba

### 4. Primera autenticación

```bash
cd mcp-google-drive-sheets
pip install -e .
python -m src.server
```

La primera vez se abrirá el navegador para autorizar. El token se guarda automáticamente en `config/token.json`.

---

## C. Instalación y Despliegue

### Local (desarrollo)

```bash
# Clonar e instalar
cd mcp-google-drive-sheets
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

# Ejecutar tests
pytest tests/ -v

# Ejecutar servidor
python -m src.server
```

### Configurar en Claude Desktop

Edita `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) o la config equivalente:

```json
{
  "mcpServers": {
    "google-drive-sheets": {
      "command": "/ruta/a/.venv/bin/python",
      "args": ["-m", "src.server"],
      "cwd": "/ruta/absoluta/a/mcp-google-drive-sheets"
    }
  }
}
```

### Configurar en Claude Code (CLI)

En tu archivo `.claude/settings.json` o `CLAUDE.md`:

```json
{
  "mcpServers": {
    "google-drive-sheets": {
      "command": "python",
      "args": ["-m", "src.server"],
      "cwd": "/ruta/absoluta/a/mcp-google-drive-sheets"
    }
  }
}
```

### Producción (servidor dedicado)

Para uso en producción, se recomienda:

1. **Usar Service Account** en lugar de OAuth interactivo (modificar `google_auth.py`)
2. **Docker**: Empaquetar con un `Dockerfile` simple
3. **Variables de entorno**: Montar `credentials.json` como secreto
4. **Monitoreo**: Los logs en `logs/activity.log` y `logs/audit_writes.log` son aptos para sistemas como Datadog/CloudWatch

---

## D. Definición de Tools MCP

| Tool | Tipo | Descripción |
|------|------|-------------|
| `drive_list_spreadsheets` | READ | Busca hojas de cálculo en Drive por nombre y/o carpeta |
| `drive_get_file_metadata` | READ | Obtiene metadatos completos de un archivo |
| `sheet_read_range` | READ | Lee valores de un rango de Google Sheets |
| `sheet_write_range` | WRITE | Escribe valores en un rango (con backup automático) |
| `sheet_append_rows` | WRITE | Añade filas al final de una pestaña |
| `sheet_batch_update` | WRITE | Operaciones múltiples atómicas |
| `excel_read_range` | READ | Lee valores de un archivo Excel en Drive |
| `excel_write_range` | WRITE | Modifica un Excel (descarga → edita → sube) |
| `convert_excel_to_gsheet` | WRITE | Convierte Excel a Google Sheets (preserva original) |

Todas las herramientas de escritura soportan `dry_run: true` para previsualizar sin aplicar cambios.

---

## E. Ejemplos de Uso (queries para Claude)

### Buscar archivos
```
"Busca todas las hojas de cálculo que contengan 'proveedores' en mi Drive"
→ drive_list_spreadsheets(query="proveedores")
```

### Leer datos
```
"Lee los datos de la pestaña 'Márgenes Q1' del archivo con ID abc123, columnas A a F"
→ sheet_read_range(file_id="abc123", range="Márgenes Q1!A1:F100")
```

### Añadir un nuevo proveedor
```
"Añade este proveedor a la hoja 'Proveedores': AceroCorp, Acero, 150€, margen 22%"
→ sheet_append_rows(
    file_id="abc123",
    sheet_name="Proveedores",
    rows=[["AceroCorp", "Acero", 150, "22%"]]
  )
```

### Actualizar precios (con preview)
```
"Quiero actualizar los precios en B2:B5, pero primero muéstrame qué cambiaría"
→ sheet_write_range(
    file_id="abc123",
    range="Precios!B2:B5",
    values=[[160], [85], [50], [220]],
    dry_run=true
  )
```

### Trabajar con Excel
```
"Lee el archivo Excel de inventario (ID xyz789), pestaña 'Stock'"
→ excel_read_range(file_id="xyz789", sheet_name="Stock")
```

### Actualización masiva
```
"Actualiza simultáneamente los márgenes en A2:A5 y los costos en C2:C5"
→ sheet_batch_update(
    file_id="abc123",
    operations=[
      {"range": "Sheet1!A2:A5", "values": [["22%"],["35%"],["18%"],["28%"]]},
      {"range": "Sheet1!C2:C5", "values": [[150],[80],[45],[120]]}
    ]
  )
```

### Convertir Excel a Google Sheets
```
"Convierte el archivo Excel xyz789 a Google Sheets para poder colaborar"
→ convert_excel_to_gsheet(file_id="xyz789")
```

---

## F. Reglas de Seguridad Implementadas

1. **Scopes mínimos**: Solo `spreadsheets` y `drive.file` — no puede acceder a archivos que no haya creado o que no se le compartan explícitamente
2. **Backup automático**: Cada operación de escritura crea un snapshot antes de modificar
3. **Modo dry_run**: Toda escritura puede previsualizarse sin aplicar cambios
4. **Audit log**: Todas las escrituras se registran en `logs/audit_writes.log` con timestamp
5. **Credenciales gitignored**: `credentials.json` y `token.json` están en `.gitignore`
6. **Sin borrado de datos**: No hay ninguna tool que permita eliminar filas, hojas o archivos
7. **Restricción de carpetas**: Se puede limitar el acceso a carpetas específicas vía `config/settings.json` → `allowed_folder_ids`
8. **Manejo robusto de errores**: Errores de API, archivos no encontrados y validaciones se devuelven como mensajes claros sin exponer credenciales

---

## G. Configuración Avanzada

### settings.json

```json
{
  "allowed_folder_ids": ["FOLDER_ID_1", "FOLDER_ID_2"],
  "max_rows_per_write": 10000,
  "max_cells_per_batch": 50000,
  "backup_enabled": true,
  "backup_retention_days": 30,
  "dry_run_default": false,
  "log_level": "INFO"
}
```

- **allowed_folder_ids**: Si no está vacío, restringe las búsquedas y operaciones a esas carpetas
- **max_rows_per_write**: Límite de seguridad para evitar escrituras masivas accidentales
- **backup_enabled**: Desactivar si no se necesitan snapshots locales
- **dry_run_default**: Si es `true`, todas las escrituras requieren `dry_run=false` explícito
