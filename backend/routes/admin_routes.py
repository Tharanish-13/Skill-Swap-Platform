from fastapi import APIRouter
from database import user_collection, swap_collection, feedback_collection

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.put("/ban/{user_id}")
async def ban_user(user_id: str):
    await user_collection.update_one({"_id": user_id}, {"$set": {"is_banned": True}})
    return {"message": "User banned."}

@router.put("/reject-skill/{user_id}")
async def reject_skill_desc(user_id: str):
    await user_collection.update_one({"_id": user_id}, {"$set": {"skills_offered": [], "skills_wanted": []}})
    return {"message": "Skills reset."}

@router.get("/reports")
async def get_reports():
    user_count = await user_collection.count_documents({})
    swap_count = await swap_collection.count_documents({})
    feedback_count = await feedback_collection.count_documents({})
    return {
        "users": user_count,
        "swaps": swap_count,
        "feedbacks": feedback_count
    }
