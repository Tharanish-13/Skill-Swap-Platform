from fastapi import APIRouter, Body
from models.swap_model import SwapRequest
from database import swap_collection
from bson import ObjectId

router = APIRouter(prefix="/swap-request", tags=["Swaps"])

@router.post("/")
async def create_swap_request(swap: SwapRequest):
    result = await swap_collection.insert_one(swap.dict())
    return {"id": str(result.inserted_id)}

@router.get("/me/{user_id}")
async def get_user_swaps(user_id: str):
    swaps = await swap_collection.find({
        "$or": [{"from_user": user_id}, {"to_user": user_id}]
    }).to_list(1000)
    # Convert _id to string
    for swap in swaps:
        swap["_id"] = str(swap["_id"])
    return swaps

@router.put("/{request_id}")
async def update_swap_status(
    request_id: str,
    status: str = Body(..., embed=True)
):
    await swap_collection.update_one(
        {"_id": ObjectId(request_id)},
        {"$set": {"status": status}}
    )
    return {"message": "Updated"}

@router.delete("/{request_id}")
async def delete_swap(request_id: str):
    await swap_collection.delete_one({"_id": ObjectId(request_id)})
    return {"message": "Deleted"}
