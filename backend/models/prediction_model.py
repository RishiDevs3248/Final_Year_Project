import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from pydantic import BaseModel
from typing import List

# Load the pre-trained model, vectorizer, and label encoder
MODEL_PATH = "skill_extractor/Models/random_forest_model.pkl"
TFIDF_PATH = "skill_extractor/Models/tfidf_vectorizer.pkl"
LE_PATH = "skill_extractor/Models/label_encoder.pkl"

model = joblib.load(MODEL_PATH)
tfidf = joblib.load(TFIDF_PATH)  # Load the fitted TF-IDF vectorizer
le = joblib.load(LE_PATH)  # Load the fitted label encoder

class SkillPredictionRequest(BaseModel):
    skills: List[str]

def predict_label(skills_str: str) -> str:
    """
    Predict the label based on input skills list.
    """
    
    # Transform the input using the loaded TF-IDF vectorizer
    input_tfidf = tfidf.transform([skills_str])
    
    # Predict the category using the Random Forest model
    predicted_category = model.predict(input_tfidf)
    
    # Convert the predicted category index back to its label
    return le.inverse_transform(predicted_category)[0]

