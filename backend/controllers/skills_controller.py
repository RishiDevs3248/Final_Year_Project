from fastapi import UploadFile
from helpers.pdf_helper import extract_text_from_pdf
from helpers.skills_helper import process_skills_with_ollama
from models.skills_model import ExtractedSkills

async def process_skills_pdf(file: UploadFile) -> ExtractedSkills:
    """
    Processes the uploaded PDF file, extracts text, and identifies skills.
    """
    try:
        # Extract text from PDF
        pdf_text = extract_text_from_pdf(file.file)
        
        # Extract skills
        skills = process_skills_with_ollama(pdf_text)

        return ExtractedSkills(skills=skills)
    except Exception as e:
        raise ValueError(f"Error processing skills: {e}")
