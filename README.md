## AI-Planet-QA: Document Question-Answering System

 lets users upload PDF documents and ask questions about their content using natural language processing.

(!! may down few times due to API connectivity !!)

---

### 🌟 Features

* PDF Upload & Management
* Natural Language Q\&A
* Conversation History
* Responsive Design

---

### 🔧 Tech Stack

* **Frontend:** React.js, Context API, Axios
* **Backend:** Python, FastAPI, LangChain, LlamaIndex, SQLAlchemy
* **Database:** PostgreSQL (Google Cloud SQL)
* **Deployment:** Vercel (Frontend), Google Cloud Run (Backend)
* **Storage:** Google Cloud Storage

---

### 🚀 Prerequisites

* Python 3.9+
* Node.js 14+
* PostgreSQL (for local development)
* Docker (recommended for backend)
* Google Cloud SDK

---

### 🎓 Local Development Setup

#### Backend (`/backend` directory)

1. **Clone & Navigate:**

```bash
git clone https://github.com/praneethreddy31/pdf-qa.git && cd pdf-qa/backend
```

2. **Virtual Environment:**

```bash
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. **Install Requirements:**

```bash
pip install -r requirements.txt
```

4. **Environment Variables:**

```bash
cp .env.example .env  # Edit .env with DB, GEMINI_API_KEY, API_V1_STR
```

5. **Database:** Ensure your PostgreSQL schema is initialized.
6. **Run Server:**

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend (`/frontend` directory)

1. **Navigate:**

```bash
cd ../frontend
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Environment Variables:**

```bash
cp .env.example .env.local  # Edit with REACT_APP_API_URL=http://localhost:8000/api
```

4. **Run App:**

```bash
npm run dev
```

---

### 🚧 Backend Deployment (Google Cloud Run & Cloud SQL)

#### Prepare Google Cloud

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable cloudbuild.googleapis.com run.googleapis.com sqladmin.googleapis.com containerregistry.googleapis.com
```

#### Create Cloud SQL Instance

* Instance: `pdf-qa-db`, Version: `POSTGRES_13`
* DB: `pdf_qa_db`, User: `pdf_qa_user`, Secure password
* Note: `YOUR_PROJECT_ID:YOUR_REGION:YOUR_INSTANCE_NAME`

#### Build & Push Docker Image (from `/backend`)

```bash
export GCR_PATH=gcr.io/YOUR_PROJECT_ID/pdf-qa-backend
gcloud builds submit --tag ${GCR_PATH}
```

#### Deploy with Cloud SQL Auth Proxy

```bash
export CLOUD_RUN_SERVICE_NAME=pdf-qa-backend
export CLOUD_RUN_REGION=your-region
export CLOUD_SQL_CONNECTION_NAME=YOUR_PROJECT_ID:REGION:INSTANCE_NAME

gcloud run deploy ${CLOUD_RUN_SERVICE_NAME} \
    --image ${GCR_PATH} \
    --platform managed \
    --region ${CLOUD_RUN_REGION} \
    --allow-unauthenticated \
    --memory 2Gi \
    --add-cloudsql-instances ${CLOUD_SQL_CONNECTION_NAME} \
    --set-env-vars="SQLALCHEMY_DATABASE_URL=postgresql://pdf_qa_user:YOUR_SECURE_PASSWORD@localhost/pdf_qa_db?host=/cloudsql/${CLOUD_SQL_CONNECTION_NAME}" \
    --set-env-vars="GEMINI_API_KEY=YOUR_GEMINI_API_KEY" \
    --set-env-vars="API_V1_STR=/api"
```

---

### 📁 Frontend Deployment (Vercel)

1. Push code to Git repo
2. Connect repo to Vercel
3. Configure project settings:

   * Build: `npm run build`
   * Output: `build`
4. Add env variable:

   * `REACT_APP_API_URL=https://your-cloud-run-service-url/api`
5. Deploy via Vercel dashboard

---

### 📃 API Documentation

Available at: `https://your-cloud-run-service-url/docs`

#### Key Endpoints (`/api` prefix assumed)

* `POST /documents/upload/`
* `GET /documents/`
* `POST /questions/ask/`
* `GET /questions/{document_id}/history/`

---

### 🔧 Running Tests

* **Backend:** `pytest`
* **Frontend:** `npm test`

---

### 👍 Contributing

Standard GitHub workflow:

* Fork > Branch > Commit > Push > PR
