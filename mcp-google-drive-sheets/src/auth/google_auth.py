"""
Google OAuth 2.0 authentication module.

Handles credential management with minimal scopes for security.
Supports both interactive OAuth flow and service account authentication.
"""

import json
import logging
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

logger = logging.getLogger(__name__)

# Minimal scopes — only what's strictly needed
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
]

DEFAULT_CONFIG_DIR = Path(__file__).resolve().parent.parent.parent / "config"
DEFAULT_CREDENTIALS_FILE = DEFAULT_CONFIG_DIR / "credentials.json"
DEFAULT_TOKEN_FILE = DEFAULT_CONFIG_DIR / "token.json"


def get_credentials(
    credentials_file: Path = DEFAULT_CREDENTIALS_FILE,
    token_file: Path = DEFAULT_TOKEN_FILE,
) -> Credentials:
    """
    Obtain valid Google API credentials.

    1. If a cached token exists and is valid, use it.
    2. If the token is expired but refreshable, refresh it.
    3. Otherwise, run the interactive OAuth consent flow.
    """
    creds = None

    if token_file.exists():
        creds = Credentials.from_authorized_user_file(str(token_file), SCOPES)
        logger.info("Loaded cached credentials from %s", token_file)

    if creds and creds.valid:
        return creds

    if creds and creds.expired and creds.refresh_token:
        logger.info("Refreshing expired credentials")
        creds.refresh(Request())
    else:
        if not credentials_file.exists():
            raise FileNotFoundError(
                f"OAuth credentials file not found at {credentials_file}. "
                "Download it from Google Cloud Console → APIs & Services → Credentials."
            )
        logger.info("Starting OAuth consent flow")
        flow = InstalledAppFlow.from_client_secrets_file(
            str(credentials_file), SCOPES
        )
        creds = flow.run_local_server(port=0)

    # Persist for next run
    token_file.parent.mkdir(parents=True, exist_ok=True)
    with open(token_file, "w") as f:
        f.write(creds.to_json())
    logger.info("Credentials saved to %s", token_file)

    return creds


def build_drive_service(creds: Credentials):
    """Build an authorized Google Drive API client."""
    from googleapiclient.discovery import build

    return build("drive", "v3", credentials=creds)


def build_sheets_service(creds: Credentials):
    """Build an authorized Google Sheets API client."""
    from googleapiclient.discovery import build

    return build("sheets", "v4", credentials=creds)
