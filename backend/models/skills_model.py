from pydantic import BaseModel
from typing import List

class ExtractedSkills(BaseModel):
    """
    Response model for extracted skills.
    """
    skills: List[str]
