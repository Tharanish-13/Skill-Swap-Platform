from fastapi import APIRouter, HTTPException
from models.auth_model import UserRegister, UserLogin
from database import user_collection
from utils.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register")
async def register_user(user: UserRegister):
    existing_user = await user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict()
    user_data.update({
        "skills_offered": [],
        "skills_wanted": [],
        "availability": [],
        "is_public": True,
        "is_banned": False,
        "profile_photo": None,
        "location": None
    })
    result = await user_collection.insert_one(user_data)
    token = create_access_token({"user_id": str(result.inserted_id)})
    return {"access_token": token}

@router.post("/login")
async def login_user(user: UserLogin):
    existing_user = await user_collection.find_one({
        "email": user.email,
        "password": user.password
    })
    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"user_id": str(existing_user["_id"])})
    return {"access_token": token}
