from services.llama_services import generate_questions_from_skills

def generate_questions(skills: list[str]):
    # Call the service to generate questions
    return generate_questions_from_skills(skills)