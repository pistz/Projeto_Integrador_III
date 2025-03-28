class HttpRequest:
    def __init__(self, body: dict, param: dict) -> None:
        self.body = body if body else {}
        self.param = param if param else {}