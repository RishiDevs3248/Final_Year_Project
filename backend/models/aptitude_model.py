from pydantic import BaseModel
from typing import List, Dict,Union

class SkillList(BaseModel):
    skills: List[str]

class Question(BaseModel):
    question: str
    options: List[str]
    answer: str

class GeneratedQuestions(BaseModel):
    skill_questions: Dict[str, Union[List[Question], Dict[str, str]]]
