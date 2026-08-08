<div align="center">

# 🚑 LifeRoute

### AI-Powered Emergency Triage & Intelligent Hospital Routing Platform

**The Right Care. At The Right Time.**

LifeRoute is an intelligent emergency healthcare platform that leverages Artificial Intelligence to assess patient severity, allocate medical resources, and recommend the most suitable hospital in real time.

---

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python)
![Firebase](https://img.shields.io/badge/Database-Firebase-FFCA28?style=for-the-badge&logo=firebase)
![AI](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge)

</div>

---

# 📌 Overview

Emergency medical decisions often rely on sending patients to the nearest hospital rather than the **most capable** one.

LifeRoute changes that.

Instead of considering only distance, LifeRoute evaluates:

- Patient symptoms
- Vital signs
- KTAS (Korean Triage & Acuity Scale)
- Required medical resources
- Hospital capability
- Distance
- Estimated Travel Time (ETA)

before recommending the hospital best equipped to provide immediate care.

---

# 🎯 Problem Statement

Current emergency response systems frequently encounter:

- Hospital overcrowding
- Resource shortages
- Incorrect patient routing
- Delayed treatment
- Inefficient emergency resource allocation

LifeRoute addresses these challenges using AI-driven triage and intelligent hospital matching.

---

# ✨ Core Features

## 🧠 AI Emergency Assessment

- KTAS Severity Prediction
- Chief Complaint Classification
- AI Clinical Reasoning
- Vital Sign Analysis

---

## 🏥 Intelligent Hospital Recommendation

- Hospital Ranking Engine
- Resource Matching
- Specialist Availability
- Medical Resource Allocation
- ETA Prediction
- Distance Calculation

---

## 📍 Navigation & Routing

- Live Location Support
- Hospital Details
- Route Preparation
- Hospital Contact Information

---

## 📊 Incident Management

- Incident Response Checklist
- Progress Tracking
- Incident Dashboard
- Role-aware Incident Filters
- Downloadable Incident Response Brief

---

# 🏗 Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router

## Backend

- FastAPI
- Python

## Artificial Intelligence

- KTAS Prediction Model
- Resource Allocation Engine
- Hospital Ranking Engine

## Database

- Firebase Firestore

## APIs

- OpenRouteService API
- Browser Geolocation API

---

# ⚙ AI Workflow

```text
Patient Assessment
        │
        ▼
Symptom Analysis
        │
        ▼
KTAS Prediction
        │
        ▼
Medical Resource Allocation
        │
        ▼
Hospital Capability Matching
        │
        ▼
Distance & ETA Calculation
        │
        ▼
Hospital Ranking
        │
        ▼
Recommended Hospital
        │
        ▼
Incident Management
```

---

# 📸 Application Screenshots

## 🏠 Landing Page

![](docs/screenshots/Screenshot%202026-08-08%20at%2010.59.24%E2%80%AFAM.png)

---

## 📝 Patient Assessment

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.01.41%E2%80%AFAM.png)

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.02.22%E2%80%AFAM.png)

---

## 🤖 AI Recommendation

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.02.41%E2%80%AFAM.png)

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.02.48%E2%80%AFAM.png)

---

## 🏥 Hospital Details

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.02.57%E2%80%AFAM.png)

---

# 🏆 Hackathon Bounty Features

The following challenge tasks were successfully implemented as part of the hackathon.

---

# ✅ 1. Incident Action Checklist

A real-time emergency response checklist allowing operators to track incident progress.

### Features

- Assessment Completed
- Ambulance Dispatched
- Hospital Contacted
- Emergency Escalation
- Incident Resolution
- Progress Percentage
- Persistent Checklist State

### Screenshot

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.03.06%E2%80%AFAM.png)

---

# ✅ 2. Role-aware Incident Dashboard

An incident dashboard that displays role-specific incident records.

### Supported Roles

- All
- Hospital
- Authority
- Patient

### Features

- Dynamic Filtering
- Incident Count
- KTAS Severity
- Assigned Hospital
- Active / Resolved Status

### Screenshot

![](docs/screenshots/Screenshot%202026-08-08%20at%2011.03.14%E2%80%AFAM.png)

---

# ✅ 3. AI Incident Response Brief

LifeRoute automatically generates a downloadable incident report containing:

- KTAS Priority
- Recommended Hospital
- Assigned Resources
- ETA
- Distance
- AI Clinical Recommendations
- Incident Timeline

📄 **Sample Report**

[View LifeRoute Incident Response Brief](docs/LifeRoute_Incident_Response_Brief.pdf)

---

# 🚀 Project Flow

```text
Landing Page

↓

Patient Assessment

↓

AI Processing

↓

Hospital Recommendation

↓

Hospital Details

↓

Incident Response Checklist

↓

Download Incident Response Brief

↓

Incident Dashboard
```

---

# 📂 Project Structure

```text
LifeRoute
│
├── backend
│   ├── ai
│   ├── app
│   └── services
│
├── frontend
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── routes
│   └── services
│
├── docs
│   ├── screenshots
│   └── LifeRoute_Incident_Response_Brief.pdf
│
└── README.md
```

---

# ▶ Installation

## Clone Repository

```bash
git clone https://github.com/Saiyam-Kumar/LifeRoute.git

cd LifeRoute
```

---

## Backend

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🌟 Future Scope

- Live Hospital Capacity Monitoring
- Real-time Ambulance Tracking
- Electronic Health Record Integration
- Multi-language Support
- Predictive Emergency Demand Analytics
- AI-powered Capacity Forecasting

---

# 👥 Team

Developed as part of a Healthcare AI Hackathon.

---

# ❤️ Vision

LifeRoute demonstrates how Artificial Intelligence can support emergency responders by enabling **faster**, **smarter**, and **resource-aware** medical decisions.

---

<div align="center">

## 🚑 The Right Care. At The Right Time.

**Built with ❤️ for smarter emergency response.**

</div>
