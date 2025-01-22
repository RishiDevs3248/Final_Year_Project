# import re
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from nltk.tokenize import word_tokenize
# from nltk.corpus import stopwords
# import nltk

# # Ensure NLTK resources are downloaded
# nltk.download("punkt", quiet=True)
# nltk.download("stopwords", quiet=True)

# def preprocess_text(text):
#     """Preprocess text by removing special characters and stopwords."""
#     text = re.sub(r"[^\w\s]", "", text.lower())
#     tokens = word_tokenize(text)
#     return " ".join([word for word in tokens if word not in stopwords.words("english")])

# def calculate_ats_score(resume: str, job_description: str) -> float:
#     """
#     Calculate ATS score by comparing resume and job description.
#     """
#     # Preprocess the texts
#     resume_clean = preprocess_text(resume)
#     job_description_clean = preprocess_text(job_description)

#     # Calculate similarity using TF-IDF
#     vectorizer = TfidfVectorizer()
#     vectors = vectorizer.fit_transform([resume_clean, job_description_clean])
#     similarity = cosine_similarity(vectors[0], vectors[1])[0][0]

#     # Return score as a percentage
#     return round(similarity * 100, 2)


import json
from helpers.pdf_helper import extract_text_from_pdf
from services.llama_services import call_llama_api


def calculate_ats_score_using_llama(resume_text: str, job_description: str) -> dict:
    """
    Use the Ollama model to calculate the ATS score by providing the resume text and job description.
    """
    # Prepare a prompt for Ollama
    prompt = (
        f"Compare the following resume and job description, then calculate an ATS score. "
        f"The response must be JSON-formatted with keys: ats_score (percentage as float),No additional text or explanation should be included. Just a plain JSON object with the score. with the text as is he qualified for the job or not."
        f"No additional text or explanation should be included.\n\n"
        f"Resume:\n{resume_text}\n\nJob Description:\n{job_description}"
    )

    # Call Ollama API
    response = call_llama_api(prompt)

    print(f"[DEBUG] Ollama response: {response.get('response')}")

    # Extract and parse the JSON response
    try:
        response_json = response.get("response", "{}")
        ats_data = json.loads(response_json)  # Parse response as JSON
        return ats_data
    except Exception as e:
        raise ValueError(f"Failed to parse ATS score response from Ollama: {e}")


def process_ats(file, job_description: str) -> dict:
    """
    Process ATS logic using Ollama: extract text, calculate ATS score, and get suggestions.
    """
    # Extract text from the resume PDF
    resume_text = extract_text_from_pdf(file.file)

    # Use Ollama to calculate the ATS score and suggestions
    ats_result = calculate_ats_score_using_llama(resume_text, job_description)

    return ats_result