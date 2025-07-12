from fastapi import FastAPI
from routes import user_routes, swap_routes, admin_routes, feedback_routes, auth_routes
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth_routes.router)
app.include_router(user_routes.router)
app.include_router(swap_routes.router)
app.include_router(admin_routes.router)
app.include_router(feedback_routes.router)

@app.get("/")
def root():
    return {"message": "Skill Swap Platform Backend Running"}