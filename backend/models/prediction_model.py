import joblib

# Load the Random Forest model
MODEL_PATH = "skill_extractor/random_forest_model.pkl"
model = joblib.load(MODEL_PATH)

def predict_label(skills_str):
    """
    Predict the label based on input skills string.
    """
    return model.predict([[skills_str]])[0]  # Predict expects 2D input

from pydantic import BaseModel
from typing import List

class SkillPredictionRequest(BaseModel):
    skills: List[str]