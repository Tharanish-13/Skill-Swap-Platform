from pydantic import BaseModel

class Feedback(BaseModel):
    from_user: str
    to_user: str
    rating: int
    comment: str
