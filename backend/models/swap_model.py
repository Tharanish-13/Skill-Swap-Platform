from pydantic import BaseModel
from typing import List, Optional

class SwapRequest(BaseModel):
    from_user: str
    to_user: str
    offered_skills: List[str]
    requested_skills: List[str]
    message: Optional[str] = ""
    status: str = "pending"
