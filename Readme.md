# 🚦 **Green Light Software — Reflex AI Traffic Management System**

### Smart India Hackathon 2025 — Team Void Pointers (DBS Global University)

---

## 🌆 Overview

Green Light Software is an AI-powered real-time adaptive traffic management system designed to reduce congestion at urban intersections.
It integrates:

* 🧠 AI-based vehicle detection
* 📈 Predictive congestion modeling
* 🚦 Dynamic green-time optimization
* 🌀 Temporal Digital Twin visualization
* 🏢 Command Centre dashboard

This repository contains the **frontend** and **backend** components.
The **AI microservice** (vision, prediction, optimization) is developed separately.

---

## ✨ Features

* 🔍 Real-time lane-wise vehicle counting
* 🔮 Congestion prediction using historical data
* 🚦 AI-generated optimized green-time allocation
* 📊 Live dashboard with charts, logs, and system status
* 🌀 Temporal Digital Twin for simulation and forecasting
* 🏙️ Command Centre mode for multi-intersection monitoring
* 🧩 Modular, scalable microservice architecture

---

## 🏗️ System Architecture

```
Frontend → Backend (FastAPI) → AI Microservices → Backend → Frontend
```

### AI Microservice Endpoints

* **POST /ai/vision** → Extracts lane counts + object types
* **POST /ai/predict** → Predicts future congestion
* **POST /ai/optimize** → Computes green-time recommendations

---

## 📁 Backend Structure

```
backend/
├── app/
│   ├── main.py
│   ├── routes.py
│   ├── config.py
│   ├── models/
│   └── services/
├── requirements.txt
└── .env
```

### Backend Endpoints

| Method | Endpoint           | Description                                                 |
| ------ | ------------------ | ----------------------------------------------------------- |
| POST   | `/upload_frame`    | Sends frame to AI → returns counts, prediction, signal plan |
| GET    | `/live_data`       | Returns latest processed data                               |
| GET    | `/get_signal_plan` | Returns optimized green-time durations                      |
| GET    | `/status`          | Health check                                                |

---

## ⚙️ Backend Setup

Navigate to backend directory:

```
cd backend
```

Create virtual environment:

```
python -m venv venv
```

Activate (Windows):

```
venv\Scripts\activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Run backend:

```
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

---

## 🖥️ Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   ├── api.js
│   ├── App.jsx
│   ├── styles.css
│   └── styles.pro.css
├── package.json
└── vite.config.js
```

---

## 🚀 Frontend Setup

Navigate to frontend:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start development server:

```
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## 🔌 Integration Flow

1. Frontend sends frame → `/upload_frame`
2. Backend forwards frame → `/ai/vision`
3. Backend sends history → `/ai/predict`
4. Backend sends counts + prediction → `/ai/optimize`
5. Backend aggregates response → returns to frontend
6. Frontend updates dashboard, charts, and digital twin
7. Frontend polls `/live_data` for real-time updates

---

## 🧰 Tech Stack

### Backend

* FastAPI
* Python
* Uvicorn
* HTTPX
* Pydantic Settings

### Frontend

* React
* Vite
* Recharts

### AI Microservice (external)

* Vision Model
* Prediction Model
* Optimization Model

---

## 👥 Team — Void Pointers (DBS Global University)

* Rishi Anand Sharma
* Parneet Kaur
* Aryan Yadav
* Aarush Pandey
* Suryansh Singh
* Varun Nigam

---

## 📜 License

MIT License

---
