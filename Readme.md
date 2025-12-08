# **Green Light Software — Reflex AI Traffic Management System**

### Smart India Hackathon 2025 — Team Void Pointers (DBS Global University)

---

## **Problem Statement (Aligned with SIH Theme)**

Urban intersections in India rely heavily on static, timer-based traffic signals that do not adapt to real-time traffic conditions. This results in long queues, unpredictable congestion, delayed emergency response, and economic losses.
The SIH theme calls for intelligent, real-time, automated decision-making systems. Green Light Software directly addresses this by enabling adaptive traffic signal control driven by AI.

---

## **Real-World Urgency and Impact**

Indian cities face:

* High congestion during peak hours
* Increased fuel consumption and emissions
* Poor emergency vehicle mobility
* Reduced productivity due to long commute times

These challenges require immediate adoption of a scalable, automated solution capable of reducing congestion without replacing existing infrastructure.

---

## **Solution Overview**

Green Light Software provides a real-time adaptive traffic management system that integrates:

* Live vehicle detection
* Congestion prediction
* Automated green-time optimization
* Real-time dashboard and digital twin visualization

It is an innovative yet practical solution that can be deployed using existing CCTV infrastructure, making it both feasible and scalable across urban India.

---

## **Use of Technology to Improve Efficiency**

The system leverages:

* AI-based vision models for lane-wise vehicle counting
* Predictive modeling to estimate upcoming congestion
* Optimization algorithms to allocate green times dynamically
* A fast backend built with FastAPI
* A responsive dashboard built with React + Vite

This technology stack significantly improves decision-making speed and traffic throughput.

---

## **Modular Architecture and Implementation Plan**

### Architecture:

```
Frontend → Backend (FastAPI) → AI Microservices → Backend → Frontend
```

### AI Microservices:

* POST /ai/vision → lane counts and object detection
* POST /ai/predict → congestion forecasting
* POST /ai/optimize → green-time optimization

### Backend Modules:

* Frame ingestion and forwarding
* Data storage and history management
* Prediction orchestration
* Optimization pipeline
* API endpoints for frontend

### Frontend Modules:

* Live dashboard
* Temporal digital twin
* Command centre UI
* Logging and reporting

### Implementation Steps:

1. Capture frames from frontend
2. Process frames through AI microservices
3. Aggregate counts, predictions, and optimized timings
4. Send results to dashboard
5. Continuously update digital twin and logs

---

## **Key Technologies, Tools, and Datasets Used**

* Backend: FastAPI, Python, Pydantic Settings, Uvicorn
* Frontend: React, Vite, Recharts
* AI (external module): Computer vision + time-series prediction + optimization
* Communication: REST APIs
* Datasets: Public traffic datasets and synthetic data for simulation

---

## **Impact Analysis**

### Social Impact:

* Improved emergency response times
* Reduced traffic stress and accidents
* Smoother commuting experience

### Technical Impact:

* Establishes a standardized intelligent signal system
* Enables multi-intersection coordination
* Scales across cities with minimal hardware upgrades

### Economic Impact:

* Reduced fuel wastage
* Lower congestion-related economic losses
* Efficient urban mobility increases productivity

---

## **Why Our Team Is the Right Choice for SIH 2025**

Team Void Pointers brings:

* Strong technical expertise in AI, frontend, backend, and system design
* Experience in developing modular, production-ready systems
* A clear understanding of traffic domain challenges
* Fast, efficient execution suitable for hackathon environments
* A realistic and deployable solution aligned with national smart-city goals

---

## **Backend Structure**

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

* POST /upload_frame
* GET /live_data
* GET /get_signal_plan
* GET /status

---

## **Backend Setup**

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

---

## **Frontend Structure**

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

## **Frontend Setup**

```
cd frontend
npm install
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## **Integration Flow**

1. Frontend sends frame to backend
2. Backend forwards frame to AI Vision
3. Backend sends lane history to AI Predict
4. Backend sends counts + prediction to AI Optimize
5. Backend sends combined result to frontend
6. Frontend updates dashboard, logs, and temporal twin
7. Continuous refresh via /live_data

---

## **Team — Void Pointers (DBS Global University)**

* Rishi Anand Sharma
* Parneet Kaur
* Aryan Yadav
* Aarush Pandey
* Suryansh Singh
* Varun Nigam

---
