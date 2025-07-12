from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from bson import ObjectId
from typing import List, Optional
from database import user_collection
import os

router = APIRouter(prefix="/user", tags=["Users"])

SECRET_KEY = os.getenv("SECRET_KEY", "swap_skill")
ALGORITHM = "HS256"

# OAuth2 scheme (expects "Bearer <token>")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ✅ Get current user from token
async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception

        user = await user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise credentials_exception

        return user

    except JWTError:
        raise credentials_exception

# ✅ Serialize Mongo document
def serialize_user(user):
    user = dict(user)
    user["id"] = str(user["_id"])
    del user["_id"]
    return user

# ✅ Get all public profiles
@router.get("/profiles")
async def get_public_profiles():
    users = await user_collection.find({"is_public": True, "is_banned": False}).to_list(1000)
    return [serialize_user(u) for u in users]

# ✅ Search profiles by skill
@router.get("/search")
async def search_users_by_skill(skill: str):
    users = await user_collection.find(
        {"skills_offered": {"$in": [skill]}, "is_public": True}
    ).to_list(1000)
    return [serialize_user(u) for u in users]

# ✅ Get current user profile
@router.get("/me")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    return serialize_user(current_user)

@router.put("/me")
async def update_my_profile(
    name: str = Form(...),
    location: Optional[str] = Form(None),
    skills_offered: Optional[List[str]] = Form(None),  # 👈 Accept multiple form fields
    skills_wanted: Optional[List[str]] = Form(None),
    availability: str = Form(...),
    is_public: bool = Form(...),
    profile_photo: Optional[UploadFile] = File(None),
    current_user: dict = Depends(get_current_user)
):
    update_data = {
    "name": name,
    "location": location,
    "availability": [availability],
    "is_public": is_public,
    }
    
    if skills_offered is not None:
        update_data["skills_offered"] = skills_offered
        
    if skills_wanted is not None:
        update_data["skills_wanted"] = skills_wanted

    if profile_photo:
        upload_dir = "static/profile_photos"
        os.makedirs(upload_dir, exist_ok=True)
        filename = f"{current_user['_id']}_{profile_photo.filename}"
        file_location = os.path.join(upload_dir, filename)
        with open(file_location, "wb") as f:
            f.write(await profile_photo.read())
        # Use relative path for API response
        update_data["profile_photo"] = f"/{file_location.replace(os.sep, '/')}"

    await user_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": update_data}
    )
    updated_user = await user_collection.find_one({"_id": current_user["_id"]})
    return serialize_user(updated_user)
