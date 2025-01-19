from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import aptitude_routes, skills_routes, prediction_routes,ats_routes

app = FastAPI(
    title="Aptitude Question Generator",
    description="Generates aptitude questions from a list of skills using Llama 3.2",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify allowed origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the routers
app.include_router(prediction_routes.router)
app.include_router(aptitude_routes.router)
app.include_router(skills_routes.router)
app.include_router(ats_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Aptitude Question Generator API!"}
