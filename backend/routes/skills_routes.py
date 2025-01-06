from fastapi import APIRouter, HTTPException, UploadFile
from controllers import skills_controller
from models.skills_model import ExtractedSkills

router = APIRouter(
    prefix="/skills",
    tags=["skills"]
)

@router.post("/extract", response_model=ExtractedSkills)
async def extract_skills(file: UploadFile):
    """
    Endpoint to extract skills from an uploaded PDF file.
    """
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
        return await skills_controller.process_skills_pdf(file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
