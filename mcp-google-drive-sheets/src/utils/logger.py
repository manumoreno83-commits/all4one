"""
Centralized logging configuration.

All read/write operations are logged for audit trail.
"""

import logging
import sys
from pathlib import Path

LOG_DIR = Path(__file__).resolve().parent.parent.parent / "logs"


def setup_logging(level: str = "INFO") -> logging.Logger:
    """Configure root logger with file + console handlers."""
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    root = logging.getLogger("mcp_gdrive")
    root.setLevel(getattr(logging, level.upper(), logging.INFO))

    # Console
    console = logging.StreamHandler(sys.stderr)
    console.setFormatter(
        logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
    )
    root.addHandler(console)

    # Activity log file
    activity = logging.FileHandler(LOG_DIR / "activity.log")
    activity.setFormatter(
        logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
    )
    root.addHandler(activity)

    # Audit log (writes only)
    audit = logging.getLogger("mcp_gdrive.audit")
    audit_handler = logging.FileHandler(LOG_DIR / "audit_writes.log")
    audit_handler.setFormatter(
        logging.Formatter("%(asctime)s | %(message)s")
    )
    audit.addHandler(audit_handler)

    return root
