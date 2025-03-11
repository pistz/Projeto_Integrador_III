class PasswordNotValid(Exception):
    def __init__(self, message: str = "Password not valid"):
        self.message = message
        super().__init__(self.message)