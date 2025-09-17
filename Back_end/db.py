import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv


# === DEBUG: Confirm .env is loaded and DATABASE_URL is correct ===
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
print("[DEBUG] DATABASE_URL from .env:", DATABASE_URL)
# === END DEBUG ===

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
