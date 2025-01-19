import joblib
from fastapi import APIRouter, HTTPException
from models.prediction_model import SkillPredictionRequest
from controllers.prediction_controller import predict_skills_controller

# Load the trained Random Forest model
model = joblib.load("skill_extractor/random_forest_model.pkl")


router = APIRouter(
    prefix="/predict",
    tags=["Model Prediction"],
)

@router.post("/predict")
async def predict_skills(request: SkillPredictionRequest):
    """
    Route to predict skills based on user input.
    """
    try:
        result = predict_skills_controller(request.skills)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))