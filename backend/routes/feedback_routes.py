from fastapi import APIRouter
from models.feedback_model import Feedback
from database import feedback_collection

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.post("/")
async def give_feedback(feedback: Feedback):
    result = await feedback_collection.insert_one(feedback.dict())
    return {"id": str(result.inserted_id)}