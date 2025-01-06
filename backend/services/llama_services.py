import requests
import json
import re
from prompts import generate_prompt

OLLAMA_API_URL = "http://localhost:11434/api/generate"  # Replace with your Ollama server URL

def generate_questions_from_skills(skills: list[str]):
    print(skills)
    skill_questions = {}
    for index, skill in enumerate(skills, start=1):
        try:
            print(f"[INFO] ({index}/{len(skills)}) Generating questions for skill: {skill}...")
            prompt = generate_prompt(skill)
            print(f"[DEBUG] Generated prompt:\n{prompt}")  # Verbose logging of the prompt
            response = call_llama_api(prompt)
            print(f"[INFO] Successfully received response for skill: {skill}. Parsing results...")
            skill_questions[skill] = parse_llama_response(response)
            print(f"[INFO] Finished processing skill: {skill}.")
        except Exception as e:
            print(f"[ERROR] Failed to process skill '{skill}': {e}")
            skill_questions[skill] = {"error": str(e)}  # Include error details in the response
    return {"skill_questions": skill_questions}

def call_llama_api(prompt: str):
    try:
        print(f"[INFO] Sending prompt to Llama 3.2 for processing...")
        headers = {"Content-Type": "application/json"}
        payload = {
            "model": "llama3.1",
            "prompt": prompt,
            "stream": False
        }
        response = requests.post(OLLAMA_API_URL, json=payload, headers=headers)
        response.raise_for_status()

        # Log the raw response text
        # print(f"[DEBUG] Llama raw response text:\n{response.text}")

        # Convert the JSON string to a valid Python dictionary
        response_json = json.loads(response.text)

        # Attempt to parse JSON
        return response_json
    except Exception as e:
        print(f"[ERROR] Error in call_llama_api: {e}")
        raise


def parse_llama_response(response: dict):
    try:
        print(f"[INFO] Parsing response from Llama 3.2...")

        # Extract the raw string response
        response_str = response.get("response", "")
        
        # Define regex patterns for question and options
        question_pattern = r'"question": "(.*?)"'
        options_pattern = r'"options": \[(.*?)\]'
        
        questions = []

        # Extract questions in the response string using regex
        questions_list = re.findall(r'\{.*?"question":.*?"options":.*?\}', response_str, re.DOTALL)

        for item in questions_list:
            print(f"Processing item: {item}")
            
            # Extracting the question
            question_match = re.search(question_pattern, item)
            options_match = re.search(options_pattern, item)
            
            if question_match and options_match:
                question = question_match.group(1)
                
                # Extract options and clean them up
                options_str = options_match.group(1)
                options = [opt.strip().strip('"') for opt in options_str.split(",")]

                # Assuming the last option as the answer (adjust if needed)
                answer = options[-1]

                # Append the result as a dictionary
                questions.append({
                    "question": question,
                    "options": options,
                    "answer": answer
                })

        print(f"[INFO] Finished parsing response.")
        return questions

    except Exception as e:
        print(f"[ERROR] Failed to parse the response: {e}")
        raise Exception(f"Error parsing Llama 3.2 response: {str(e)}")