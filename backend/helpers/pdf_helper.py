from pypdf import PdfReader

def extract_text_from_pdf(file):
    """
    Extracts text from a given PDF file using PyPDF2.
    """
    text = ""
    try:
        reader = PdfReader(file)
        for page in reader.pages:
            text += page.extract_text() + "\n"
    except Exception as e:
        raise ValueError(f"Failed to extract text from PDF: {e}")
    
    print("Extracted text from PDF.",text)
    return text
