def generate_prompt(skill: str) -> str:
    prompt = f"""
Generate 5 aptitude questions for the skill: {skill}.

Output the response in the following JSON format:

Note : The answer should be one of the options provided. dont say it as option 1 or option 2 or option a or option b. Just provide the answer.

{{
  "questions": [
    {{
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "string"
    }},
    ...
  ]
}}

Ensure:
- Each question is relevant to the skill "{skill}".
- There are four options for each question.
- The answer corresponds to one of the options.

Return ONLY the JSON output. Do not include any additional text or comments.
"""
    return prompt