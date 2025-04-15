from enum import Enum


class UserRoles(Enum):
    ADMIN = 'admin'
    REGISTER_ONLY = 'register_only'
    REPORT_ONLY = 'report_only'
