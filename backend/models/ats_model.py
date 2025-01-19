from pydantic import BaseModel

class ATSRequest(BaseModel):
    resume: str
    job_description: str

class ATSResponse(BaseModel):
    ats_score: float
