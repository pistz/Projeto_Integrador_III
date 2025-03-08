class CreateUserDTO:
    def __init__(self, **kwargs):
        self.name = kwargs['name']
        self.email = kwargs['email']
        self.password = kwargs['password']