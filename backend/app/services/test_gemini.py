   # test_gemini.py
   import google.generativeai as genai
   
   # Use your actual API key here
   genai.configure(api_key=AIzaSyBvXPDydUJbtmPOFBl6NF5vXSUKi4mhNJw)
   
   try:
       model = genai.GenerativeModel('gemini-pro')
       response = model.generate_content("What is 2+2?")
       print("Success:", response.text)
   except Exception as e:
       print("Error:", str(e))
   