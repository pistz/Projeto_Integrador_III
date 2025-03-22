import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def load_db_env():
    return os.getenv("DATABASE_URL")

def load_secret_key():
    return os.getenv("JWT_SECRET_KEY")

def load_frontend_origin():
    return os.getenv("FRONTEND_URL")