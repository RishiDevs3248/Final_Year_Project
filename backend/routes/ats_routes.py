from fastapi import APIRouter, HTTPException, UploadFile, Header
from controllers.ats_controller import process_ats
from models.ats_model import ATSResponse

router = APIRouter(
    prefix="/ats",
    tags=["ats"]
)

@router.post("/score", response_model=ATSResponse)
def ats_score(file: UploadFile, job_description: str = Header(None)):
    """
    Calculate ATS score based on resume and job description provided in the header.
    """
    try:
        # Validate file type
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
        # Validate job description
        if not job_description:
            raise HTTPException(status_code=400, detail="Job description header is required.")
        
        # Process the ATS logic
        result = process_ats(file, job_description)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
