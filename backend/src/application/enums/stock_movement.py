from enum import Enum


class MovementType(Enum):
    IN = "IN"
    OUT = "OUT"

class MovementSource(Enum):
    BUY = "BUY"
    DONATION = "DONATION"
    USE = "USE"
    EXPIRED = "EXPIRED"