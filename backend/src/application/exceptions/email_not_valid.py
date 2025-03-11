class EmailNotValid(Exception):
    def __init__(self, message: str = "Email is not valid"):
        self.message = message
        super().__init__(self.message)