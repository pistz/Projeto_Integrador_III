from datetime import datetime

from src.application.exceptions.invalid_data import InvalidData


def parse_datetime(date_str: str) -> datetime:
    known_formats = [
        "%Y-%m-%d",
        "%Y-%m-%d %H:%M",
        "%Y-%m-%d %H:%M:%S",
        "%d/%m/%Y",
        "%d/%m/%Y %H:%M",
        "%d/%m/%Y %H:%M:%S",
        "%Y-%m-%dT%H:%M:%S",
    ]

    for fmt in known_formats:
        try:
            return datetime.strptime(date_str, fmt)
        except ValueError:
            continue

    raise InvalidData(f"Invalid date format: '{date_str}'.")
