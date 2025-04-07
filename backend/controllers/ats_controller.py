

import json
from helpers.pdf_helper import extract_text_from_pdf
from services.llama_services import call_llama_api


# def calculate_ats_score_using_llama(resume_text: str, job_description: str) -> dict:
#     """
#     Use the Ollama model to calculate the ATS score by providing the resume text and job description.
#     """
#     # Prepare a prompt for Ollama with structured evaluation criteria
#     prompt = (
#         f"Task: You are an ATS (Applicant Tracking System) algorithm analyzing the resume below against a job description.\n\n"
#         f"Instructions:\n"
#         f"1. Identify key skills, qualifications, and experience requirements in the job description\n"
#         f"2. Check how many of these requirements are present in the resume\n"
#         f"3. Calculate a matching percentage (0-100) based on requirements met\n"
#         f"4. Determine if the candidate is qualified based on a threshold of 70% match\n"
#         f"5. Return ONLY a JSON object with the following structure:\n"
#         f"{{\"ats_score\": [score_as_float], \"qualified\": [true_or_false]}}\n\n"
#         f"Resume:\n{resume_text}\n\nJob Description:\n{job_description}\n\n"
#         f"Provide ONLY the JSON response with no additional text or explanation."
#     )

#     # Call Ollama API
#     response = call_llama_api(prompt)

#     print(f"[DEBUG] Ollama response: {response.get('response')}")

#     # Extract and parse the JSON response
#     try:
#         response_json = response.get("response", "{}")
#         # Clean the response in case there's any non-JSON text
#         json_start = response_json.find("{")
#         json_end = response_json.rfind("}") + 1
#         if json_start >= 0 and json_end > 0:
#             cleaned_json = response_json[json_start:json_end]
#             ats_data = json.loads(cleaned_json)
#             return ats_data
#         else:
#             raise ValueError("Could not find valid JSON in response")
#     except Exception as e:
#         raise ValueError(f"Failed to parse ATS score response from Ollama: {e}")

import re
import spacy
import numpy as np
from collections import Counter
from sklearn.feature_extraction.text import TfidfVectorizer

# Load spaCy model
nlp = spacy.load("en_core_web_md")  # Medium English model with word vectors

class ATSScorer:
    def __init__(self):
        self.skill_categories = {
            "programming": ["python", "java", "javascript", "c++", "ruby", "php", "typescript", 
                           "golang", "swift", "kotlin", "rust", "scala", "perl", "r"],
            "data": ["sql", "mysql", "postgresql", "mongodb", "database", "data analysis", 
                    "data science", "big data", "hadoop", "spark", "tableau", "power bi"],
            "cloud": ["aws", "azure", "gcp", "google cloud", "cloud computing", "docker", 
                     "kubernetes", "devops", "ci/cd"],
            "education": ["bachelor", "master", "phd", "bs", "ms", "ba", "degree", "certification"],
            "soft_skills": ["communication", "teamwork", "leadership", "problem solving", 
                           "time management", "critical thinking"]
        }
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
    def preprocess_text(self, text):
        """Clean and normalize text"""
        # Convert to lowercase
        text = text.lower()
        # Remove special characters
        text = re.sub(r'[^\w\s]', ' ', text)
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        # Process with spaCy
        doc = nlp(text)
        # Get lemmatized tokens, excluding stopwords and punctuation
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
        return " ".join(tokens), doc
    
    def extract_key_phrases(self, job_desc_doc):
        """Extract key phrases from job description using NLP techniques"""
        key_phrases = []
        
        # Extract noun chunks as potential requirements
        for chunk in job_desc_doc.noun_chunks:
            if len(chunk.text.split()) <= 4:  # Limit to reasonable phrase length
                key_phrases.append(chunk.lemma_)
        
        # Extract named entities that might be technologies or qualifications
        for ent in job_desc_doc.ents:
            if ent.label_ in ["ORG", "PRODUCT", "GPE"]:
                key_phrases.append(ent.lemma_)
                
        # Use TF-IDF to find important terms
        try:
            if job_desc_doc.text:
                tfidf = self.vectorizer.fit_transform([job_desc_doc.text])
                feature_names = self.vectorizer.get_feature_names_out()
                important_terms = [(feature_names[i], tfidf[0, i]) 
                                 for i in tfidf.indices if tfidf[0, i] > 0.01]
                
                important_terms.sort(key=lambda x: x[1], reverse=True)
                for term, _ in important_terms[:20]:  # Take top 20 terms
                    key_phrases.append(term)
        except:
            pass  # Fallback if TF-IDF fails
            
        # Add skill category keywords found in text
        for category, skills in self.skill_categories.items():
            for skill in skills:
                if skill in job_desc_doc.text.lower():
                    key_phrases.append(skill)
        
        # Deduplicate
        return list(set(key_phrases))
    
    def calculate_semantic_match(self, phrase, resume_doc):
        """Calculate semantic match score between phrase and resume"""
        phrase_doc = nlp(phrase)
        
        # Try exact match first
        if phrase.lower() in resume_doc.text.lower():
            return 1.0
            
        # Try semantic similarity with each sentence in resume
        best_similarity = 0
        for sent in resume_doc.sents:
            similarity = phrase_doc.similarity(sent)
            best_similarity = max(best_similarity, similarity)
            
        return best_similarity
    
    def extract_requirements(self, job_desc_text):
        """Extract weighted requirements from job description"""
        _, job_desc_doc = self.preprocess_text(job_desc_text)
        key_phrases = self.extract_key_phrases(job_desc_doc)
        
        # Assign weights based on patterns
        requirements = []
        for phrase in key_phrases:
            weight = 1  # Default weight
            
            # Higher weight for years of experience
            if re.search(r'\d+\s+years?', phrase):
                weight = 3
            # Higher weight for education
            elif any(edu in phrase for edu in self.skill_categories["education"]):
                weight = 2.5
            # Higher weight for programming languages
            elif any(lang in phrase for lang in self.skill_categories["programming"]):
                weight = 2
                
            requirements.append({"keyword": phrase, "weight": weight})
            
        return requirements
    
    def calculate_score(self, resume_text, job_description):
        """Calculate ATS compatibility score"""
        resume_clean, resume_doc = self.preprocess_text(resume_text)
        job_desc_clean, _ = self.preprocess_text(job_description)
        
        # Extract requirements
        requirements = self.extract_requirements(job_description)
        
        # Calculate matches with semantic similarity
        matches = []
        missing = []
        total_weight = sum(req['weight'] for req in requirements)
        matched_weight = 0
        match_details = []
        
        for req in requirements:
            keyword = req['keyword']
            weight = req['weight']
            
            match_score = self.calculate_semantic_match(keyword, resume_doc)
            
            if match_score > 0.75:  # Threshold for considering it a match
                matches.append(keyword)
                matched_weight += weight * match_score
                match_details.append({
                    "keyword": keyword,
                    "match_score": round(match_score, 2),
                    "weight": weight
                })
            else:
                missing.append(keyword)
        
        # Calculate final score
        if total_weight > 0:
            score = (matched_weight / total_weight) * 100
        else:
            score = 0
            
        qualified = score >= 70
        
        return {
            "ats_score": round(score, 2),
            "qualified": qualified,
            "matched_keywords": matches,
            "missing_keywords": missing,
            "match_details": match_details
        }

def calculate_ats_score(resume_text, job_description):
    """Frontend function to calculate ATS score"""
    scorer = ATSScorer()
    return scorer.calculate_score(resume_text, job_description)


def process_ats(file, job_description: str) -> dict:
    """
    Process ATS logic using Ollama: extract text, calculate ATS score, and get suggestions.
    """
    # Extract text from the resume PDF
    resume_text = extract_text_from_pdf(file.file)

    # Use Ollama to calculate the ATS score and suggestions
    ats_result = calculate_ats_score(resume_text, job_description)
    print(f"ATS Score: {ats_result['ats_score']}%")
    print(f"Qualified: {'Yes' if ats_result['qualified'] else 'No'}")
    print(f"Matched Keywords: {', '.join(ats_result['matched_keywords'])}")
    print(f"Missing Keywords: {', '.join(ats_result['missing_keywords'])}")

    return {"ats_score":ats_result['ats_score']}