
# PDF-QA: Document Question-Answering System



PDF-QA is a full-stack application that allows users to upload PDF documents and ask questions about their content. The system uses advanced natural language processing to analyze documents and provide accurate answers based on the document content.



![PDF-QA Application Demo](https://example.com/demo-image.png)



## 🌟 Features



- PDF Document Upload - Securely upload and manage your PDF documents

- Natural Language Question Answering - Ask questions in plain English about your documents

- Document Management - Keep track of all your uploaded documents

- Conversation History - Review previous questions and answers

- Responsive Design - Works on desktop and mobile devices



## 🏗️ Architecture



```

+-------------------+    +-------------------+    +-------------------+

|                   |    |                   |    |                   |

|  React Frontend   |<-->|  FastAPI Backend  |<-->|  PostgreSQL DB    |

|  (Vercel)         |    |  (Google Cloud Run)|    |  (Cloud SQL)      |

|                   |    |                   |    |                   |

+-------------------+    +-------------------+    +-------------------+

                              |

                              v

                      +-------------------+    +-------------------+

                      |                   |    |                   |

                      |  LangChain/LlamaIndex |    | PDF Storage       |

                      |  (NLP Processing)  |    | (Cloud Storage)    |

                      |                   |    |                   |

                      +-------------------+    +-------------------+

```


## 🛠️ Tech Stack



- Frontend: React.js, Context API, Axios

- Backend: FastAPI, LangChain, LlamaIndex

- Database: PostgreSQL

- Deployment: Vercel (Frontend), Google Cloud Run (Backend)

- Storage: Google Cloud Storage (PDFs)


### Prerequisites



- Python 3.9+

- Node.js 14+

- PostgreSQL

- Docker (optional for local development)



### Backend Setup



1. Clone the repository

   ```bash

   git clone https://github.com/yourusername/pdf-qa.git

   cd pdf-qa/backend

   ```



2. Create a virtual environment

   ```bash

   python -m venv venv

   source venv/bin/activate  # On Windows: venv\Scripts\activate

   ```



3. Install dependencies

   ```bash

   pip install -r requirements.txt

   ```



4. Set up environment variables

   ```bash

   cp .env.example .env

   # Edit .env with your database credentials and API keys

   ```



5. Run the backend

   ```bash

   uvicorn app.main:app --reload

   ```



### Frontend Setup



1. Navigate to the frontend directory

   ```bash

   cd ../frontend

   ```



2. Install dependencies

   ```bash

   npm install

   ```



3. Set up environment variables

   ```bash

   cp .env.example .env.local

   # Edit .env.local with your API endpoint

   ```



4. Start the development server

   ```bash

   npm run dev

   ```



5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Deployment to Google Cloud Run



1. Build and push the Docker image



   First, make sure you have the [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and configured.



   ```bash

   # Navigate to backend directory

   cd backend



   # Initialize gcloud if you haven't already

   gcloud init



   # Enable required APIs

   gcloud services enable cloudbuild.googleapis.com run.googleapis.com



   # Build and push the Docker image

   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/pdf-qa-backend

   ```



2. Deploy to Cloud Run



   ```bash

   gcloud run deploy pdf-qa-backend \

     --image gcr.io/YOUR_PROJECT_ID/pdf-qa-backend \

     --platform managed \

     --region us-central1 \

     --allow-unauthenticated \

     --memory 2Gi \

     --set-env-vars="DATABASE_URL=postgresql://username:password@host:port/database"

   ```



3. Set up Cloud SQL (if using)



   For production deployments, you should use a managed PostgreSQL instance:



   ```bash

   # Create a Cloud SQL instance

   gcloud sql instances create pdf-qa-db \

     --database-version=POSTGRES_13 \

     --tier=db-g1-small \

     --region=us-central1



   # Create a database

   gcloud sql databases create pdf_qa_db --instance=pdf-qa-db



   # Create a user

   gcloud sql users create pdf_qa_user \

     --instance=pdf-qa-db \

     --password=YOUR_SECURE_PASSWORD

   ```



### Frontend Deployment to Vercel



1. Push your code to GitHub



2. Connect to Vercel

   - Create an account on [Vercel](https://vercel.com) if you don't have one

   - Import your GitHub repository

   - Configure the project:

     - Build Command: `npm run build`

     - Output Directory: `build`

     - Install Command: `npm install`



3. Set environment variables

   - Go to your project settings in Vercel

   - Add the following environment variable:

     ```

     REACT_APP_API_URL=https://pdf-qa-backend-xxxxxxxx-uc.a.run.app/api

     ```



4. Deploy

   - Click "Deploy" and wait for the build to complete

   - Your app will be available at `https://your-project-name.vercel.app`



## 📚 API Documentation



Once deployed, you can access the API documentation at:

`https://pdf-qa-backend-xxxxxxxx-uc.a.run.app/docs`



### Key Endpoints



- `POST /api/documents/upload/` - Upload a PDF document

- `GET /api/documents/` - Get list of uploaded documents

- `POST /api/questions/ask/` - Ask a question about a document


### Backend Tests



```bash

cd backend

pytest

```



### Frontend Tests



```bash

cd frontend

npm test

```



## 🤝 Contributing



Contributions are welcome! Please feel free to submit a Pull Request.



1. Fork the repository

2. Create your feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add some amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request



## ⚠️ Requirements



- Node.js - v14.x or higher

- Python - v3.9 or higher

- PostgreSQL - v13 or higher