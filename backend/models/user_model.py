from pydantic import BaseModel, EmailStr
from typing import List, Optional

class User(BaseModel):
    name: str
    email: EmailStr
    location: Optional[str] = None
    profile_photo: Optional[str] = None
    skills_offered: List[str]
    skills_wanted: List[str]
    availability: List[str]
    is_public: bool = True
    is_banned: bool = False