import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGODB_URL")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)
database = client.skill_swap

user_collection = database.get_collection("users")
swap_collection = database.get_collection("swaps")
feedback_collection = database.get_collection("feedbacks")
