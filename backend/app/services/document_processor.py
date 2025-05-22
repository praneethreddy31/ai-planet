import PyPDF2
import io
from typing import Dict, Any

def process_pdf(file_content: bytes) -> Dict[str, Any]:
    """
    Process a PDF file and extract its content.
    
    Args:
        file_content: The binary content of the PDF file
        
    Returns:
        A dictionary containing the extracted text and metadata
    """
    try:
        # Create a file-like object from bytes
        pdf_file = io.BytesIO(file_content)
        
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        # Extract text from all pages
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
        
        return {
            "text": text,
            "page_count": len(pdf_reader.pages),
            "success": True
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
