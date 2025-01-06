
# Project Setup Guide

This README provides step-by-step instructions for setting up the environment to run the LLaMA 3.1 model using the Ollama platform and configuring the backend (FastAPI) and frontend (React) components.

---

## 1. Setting Up Ollama and Pulling the LLaMA 3.1 Model

Ollama provides an efficient way to run local AI models. Follow the instructions below to install Ollama and pull the LLaMA 3.1 model.

### Prerequisites
- **Windows or macOS**
- **Docker** installed on your system (Ollama depends on Docker)

### Installation Steps for Ollama
#### For macOS
1. Download the Ollama application:
   [Download Ollama for macOS](https://ollama.ai/download/macos)
2. Install Ollama by opening the downloaded `.dmg` file and following the on-screen instructions.

#### For Windows
1. Download the Ollama application:
   [Download Ollama for Windows](https://ollama.ai/download/windows)
2. Run the installer and follow the on-screen instructions to complete the installation.

### Pulling the LLaMA 3.1 Model
1. Open a terminal or command prompt.
2. Run the following command to pull the LLaMA 3.1 model:
   ```bash
   ollama pull llama3.1
   ```
3. Verify the model is installed by listing available models:
   ```bash
   ollama list
   ```

---

## 2. Backend and Frontend Setup

This project consists of:
- **Backend**: A FastAPI server for handling API requests.
- **Frontend**: A React application for the user interface.

### Prerequisites
- **Python 3.8+** installed
- **Node.js 16+** and **npm** or **yarn**
- **Git** installed on your system

### Project Structure
```plaintext
project-repo/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── src/
│   ├── package.json
│   └── public/
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
5. The backend will be running at:
   - Local: `http://127.0.0.1:8000`
   - Swagger API Docs: `http://127.0.0.1:8000/docs`

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   Or, if you're using yarn:
   ```bash
   yarn install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   Or, using yarn:
   ```bash
   yarn start
   ```
4. The frontend will be running at:
   - Local: `http://localhost:3000`

---

## 3. Running the Complete Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to access the application.

---

## 4. Additional Notes

- Ensure Docker is running when using Ollama for the LLaMA 3.1 model.
- Update dependencies as needed using:
  - Backend: `pip install --upgrade -r requirements.txt`
  - Frontend: `npm update` or `yarn upgrade`
- If you face issues, consult the respective documentation:
  - [Ollama Docs](https://ollama.ai/docs)
  - [FastAPI Documentation](https://fastapi.tiangolo.com/)
  - [React Documentation](https://reactjs.org/docs/getting-started.html)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
