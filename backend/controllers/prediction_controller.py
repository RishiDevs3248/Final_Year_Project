from models.prediction_model import predict_label

def predict_skills_controller(skills):
    """
    Controller logic for skill prediction.
    """
    skills_str = " ".join(skills)  # Convert list of skills to a single string
    prediction = predict_label(skills_str)  # Call the model's predict function
    return {"predicted_label": prediction}