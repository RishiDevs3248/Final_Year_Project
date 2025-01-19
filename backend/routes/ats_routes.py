from fastapi import APIRouter, HTTPException,UploadFile
from controllers.ats_controller import process_ats
from models.ats_model import ATSRequest, ATSResponse

router = APIRouter(
    prefix="/ats",
    tags=["ats"]
)

@router.post("/score", response_model=ATSResponse)
def ats_score(file: UploadFile, job_description: str):
    """
    Calculate ATS score based on resume and job description.
    """
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")
          # Process the ATS logic
        result = process_ats(file, job_description)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
