from fastapi import APIRouter, HTTPException
from controllers import aptitude_controller
from models.aptitude_model import SkillList, GeneratedQuestions

router = APIRouter(
    prefix="/aptitude",
    tags=["aptitude"]
)

@router.post("/generate", response_model=GeneratedQuestions)
def generate_questions(skill_list: SkillList):
    try:
        return aptitude_controller.generate_questions(skill_list.skills)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
