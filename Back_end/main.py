# Simple hello endpoint for frontend connectivity test
@app.get("/hello")
def hello():
	return {"message": "Hello from FastAPI backend!"}

# ...existing imports...
import random
from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from db import engine, SessionLocal
import models
import bcrypt
from jose import jwt
import os
from datetime import datetime, timedelta

# === FastAPI app initialization ===
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],  # You can restrict to ["http://localhost:5173"] for more security
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

# === In-memory store for OTPs (for development/testing only) ===
otp_store = {}

# === OTP generation endpoint for development/testing ===
# In production, send OTP via SMS/email and store securely (e.g., Redis, DB)
@app.post("/generate-otp")
def generate_otp(email: str):
    # Generate a 4-digit numeric OTP
    otp = str(random.randint(1000, 9999))
    # Store OTP in memory (keyed by email)
    otp_store[email] = otp
    # Log OTP to server console for manual testing
    print(f"OTP for {email}: {otp}")
    # In production, send OTP via SMS/email here
    return {"email": email, "otp": otp, "message": "OTP generated (for dev only)"}

# === OTP verification endpoint for development/testing ===
# Only passes if the correct OTP for the email is provided
# In production, verify OTP from secure store
@app.post("/verify-otp")
def verify_otp(
    email: str = Body(..., embed=True),
    otp: str = Body(..., embed=True)
):
    # Check if OTP exists for the email
    stored_otp = otp_store.get(email)
    if stored_otp is None:
        return {"email": email, "verified": False, "message": "No OTP found for this email"}
    # Check if OTP matches stored value
    if stored_otp == otp:
        # Remove OTP after successful verification
        del otp_store[email]
        return {"email": email, "verified": True, "message": "OTP verified successfully"}
    else:
        return {"email": email, "verified": False, "message": "Invalid OTP"}


from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from db import engine, SessionLocal
import models
import bcrypt
from jose import jwt
import os
from datetime import datetime, timedelta


app = FastAPI()

# OTP generation endpoint for development/testing
# In production, send OTP via SMS/email instead of returning it in response
@app.post("/generate-otp")
def generate_otp(email: str):
	# Generate a 4-digit numeric OTP
	otp = str(random.randint(1000, 9999))
	# Log OTP to server console for manual testing
	print(f"OTP for {email}: {otp}")
	# In production, send OTP via SMS/email here
	return {"email": email, "otp": otp, "message": "OTP generated (for dev only)"}


# Dependency to get DB session
def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

# Test endpoint to check DB connectivity
@app.get("/db-test")
def db_test(db: Session = Depends(get_db)):
	try:
		user_count = db.query(models.User).count()
		return {"db_connected": True, "user_count": user_count}
	except Exception as e:
		return {"db_connected": False, "error": str(e)}

# Create tables on startup
@app.on_event("startup")
def on_startup():
	models.Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()

# JWT config
# JWT config
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# Pydantic model for signup
class SignupRequest(BaseModel):
	username: str
	email: EmailStr
	password: str
	phone: str = None
	is_root: bool = False
	class Config:
		extra = "allow"


# Signup endpoint
@app.post("/signup")
def signup(user: SignupRequest, db: Session = Depends(get_db)):
	# Check if user or email already exists
	if db.query(models.User).filter(models.User.username == user.username).first():
		raise HTTPException(status_code=400, detail="Username already registered")
	if db.query(models.User).filter(models.User.email == user.email).first():
		raise HTTPException(status_code=400, detail="Email already registered")
	# Hash password
	hashed_pw = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
	db_user = models.User(
		username=user.username,
		email=user.email,
		phone=user.phone,
		hashed_password=hashed_pw,
		is_root=user.is_root
	)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return {"message": "User created successfully", "user_id": db_user.id}

def verify_password(plain_password, hashed_password):
	return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

def create_access_token(data: dict, expires_delta: timedelta = None):
	to_encode = data.copy()
	expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
	to_encode.update({"exp": expire})
	return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/signin")
def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
	user = db.query(models.User).filter(models.User.username == form_data.username).first()
	if not user or not verify_password(form_data.password, user.hashed_password):
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
	# Role differentiation
	role = "root" if user.is_root else "user"
	# Log sign-in (simple print, replace with DB log if needed)
	print(f"User {user.username} signed in as {role} at {datetime.utcnow()}")
	# JWT token
	access_token = create_access_token({"sub": user.username, "role": role})
	return {"access_token": access_token, "token_type": "bearer", "role": role}
