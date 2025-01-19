import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

from services.llama_services import call_llama_api

# Ensure NLTK resources are downloaded
try:
    nltk.download("punkt", quiet=True)  # 'punkt_tab' is not required; use 'punkt'
    nltk.download("stopwords", quiet=True)
except Exception as e:
    print(f"Error downloading NLTK resources: {e}")

def extract_technical_skills(text):
    """
    Extracts the technical skills section from the text using regex and handles bullet points.
    """
    try:
        # Define the pattern to locate the skills section (case insensitive)
        skills_pattern = re.compile(r"(?i)(technical skills|skills|expertise):?\s*([\s\S]+?)(\n\n|\Z)")

        # Search for the skills section
        match = skills_pattern.search(text)
        if not match:
            return None

        # Extract the skills section text
        skills_section = match.group(2).strip()

        # Clean up bullet points, new lines, and extra spaces
        cleaned_skills_section = re.sub(r"•\s*", "", skills_section)  # Remove bullet points
        cleaned_skills_section = re.sub(r"\n", ", ", cleaned_skills_section)  # Replace newlines with commas

        return cleaned_skills_section
    except Exception as e:
        print(f"Error extracting skills section: {e}")
        return None
    

def process_skills_with_ollama(text):
    """
    Process the skills using Ollama after extracting the technical skills section.
    """
    # Step 1: Extract the skills section using regex
    skills_section = extract_technical_skills(text)
    
    if not skills_section:
        print("No skills section found.")
        return []

    # Step 2: Prepare a prompt for Ollama
    prompt = (
        f"Extract the skills from the following text and return them as a JSON-formatted list of strings. "
        f"Ensure the response contains only the list in this format: [item1, item2, item3, ...] with no additional text or explanation:\n\n"
        f"{skills_section}"
    )
    response = call_llama_api(prompt)

    # Step 3: Extract and clean the response
    response_str = response.get("response", "")

    # Apply regex to find content inside square brackets
    bracket_pattern = re.compile(r"\[([\s\S]+?)\]")  # Matches content inside square brackets
    match = bracket_pattern.search(response_str)

    if not match:
        print("No content found inside square brackets in the response.")
        return []

    # Extract content within the square brackets
    bracketed_content = match.group(1)

    print(bracketed_content)

    # Split the content into a list and clean it
    skill_list = [skill.strip().capitalize() for skill in bracketed_content.split(",") if skill.strip()]

    return skill_list