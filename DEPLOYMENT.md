# 🚀 Train Booking Application - Deployment & Render Guide

This guide provides step-by-step instructions for containerizing and deploying the **Train Booking Application** using Docker, Docker Compose, and **Render**.

---

## ☁️ Step-by-Step Render Deployment Guide

You can deploy the full application on Render in **two easy ways**:

### Option A: 1-Click Render Blueprint Deployment (Recommended)

Render Blueprints automatically provision the **Managed Database**, **Spring Boot Backend Web Service**, and **React Frontend Web Service** using the [`render.yaml`](file:///d:/Code/TrainApp/render.yaml) file included in the repository.

1. **Push your code to GitHub / GitLab**.
2. Log into your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** -> **Blueprints**.
4. Connect your GitHub repository (`Train-Booking-Application`).
5. Render will automatically detect `render.yaml` and show:
   - `train-booking-db` (PostgreSQL Database Instance)
   - `train-booking-backend` (Spring Boot Web Service)
   - `train-booking-frontend` (Nginx Web Service)
6. Click **Apply**. Render will automatically build and deploy all services!

---

### Option B: Manual Setup via Render Dashboard

If you prefer to configure each service manually in the Render dashboard:

#### Step 1: Create PostgreSQL Database Instance
1. In Render Dashboard, click **New +** -> **PostgreSQL**.
2. Set Name: `train-booking-db`, Database: `ticket_booking_db`, User: `ticket_user`, Region: `Singapore` (or preferred).
3. Copy the **Internal Database URL** (e.g., `postgresql://ticket_user:pass@dbservice:5432/ticket_booking_db`).

#### Step 2: Deploy Spring Boot Backend Web Service
1. Click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Environment**: `Docker`
   - **Docker Command Context**: `app`
   - **Dockerfile Path**: `Dockerfile`
4. Add **Environment Variables**:
   - `PORT` = `8086`
   - `SPRING_DATASOURCE_URL` = `<Internal Database URL from Step 1>`
   - `SPRING_DATASOURCE_DRIVER_CLASS_NAME` = `org.postgresql.Driver`
   - `SPRING_JPA_HIBERNATE_DDL_AUTO` = `update`
   - `JWT_SECRET` = `<Generated 32+ character random secret string>`
   - `ALLOWED_ORIGINS` = `*`
5. Click **Create Web Service**. Copy the deployed backend URL (e.g. `https://train-booking-backend.onrender.com`).

#### Step 3: Deploy React Frontend Web Service
1. Click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Environment**: `Docker`
   - **Docker Command Context**: `app`
   - **Dockerfile Path**: `Dockerfile.frontend`
4. Click **Create Web Service**. Your app is live!

---

## ⚡ Quick Start: Local Deployment via Docker Compose

### 1. Build and Launch Containers
Run from the repository root (`d:\Code\TrainApp`):

```bash
docker compose up --build -d
```

### 2. Verify Services

- **Web Application UI**: Open `http://localhost` in your browser.
- **Backend Health Check**: Open `http://localhost:8086/api/trains/stations`.

### 3. Viewing Container Logs

```bash
docker compose logs -f
```

---

## 🔑 Environment Variables Reference

| Environment Variable | Default Value | Description |
|---|---|---|
| `PORT` | `8086` | Port Spring Boot listens on |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/ticket_booking_db` | Database JDBC / Connection URL |
| `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | `com.mysql.cj.jdbc.Driver` or `org.postgresql.Driver` | Database JDBC driver |
| `SPRING_DATASOURCE_USERNAME` | `root` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `SQLfor2027` | Database password |
| `JWT_SECRET` | `this-is-a-temporary-dev-secret...` | 32+ byte secret key for signing JWTs |
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Configurable CORS allowed origins |
| `VITE_API_BASE_URL` | `http://localhost:8086/api` or `/api` | Base URL for frontend API calls |
