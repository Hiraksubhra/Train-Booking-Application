# 🚀 Train Booking Application - Deployment & Docker Guide

This guide provides step-by-step instructions for containerizing and deploying the **Train Booking Application** using Docker, Docker Compose, and cloud hosting platforms.

---

## 🏗️ Architecture Summary

The deployment consists of three containerized services connected via an isolated Docker bridge network:

1. **`mysql-db`**: MySQL 8.0 database with persistent volume storage (`mysql_data`).
2. **`backend`**: Spring Boot Java 21 REST API container (running on port `8086`).
3. **`frontend`**: Nginx web server container serving the React SPA bundle and reverse-proxying `/api/` traffic to the backend (running on port `80`).

---

## 🛠️ Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Git](https://git-scm.com/) installed.

---

## ⚡ Quick Start: Local Deployment via Docker Compose

### 1. Build and Launch Containers
Run the following command from the repository root (`d:\Code\TrainApp`):

```bash
docker compose up --build -d
```

This single command will:
- Initialize the MySQL database and wait for it to report `healthy`.
- Compile and package the Spring Boot backend JAR, then start the container.
- Compile the React Vite frontend bundle, configure Nginx, and launch the frontend web server.

### 2. Verify Services

- **Web Application UI**: Open `http://localhost` in your browser.
- **Backend Health Check**: Open `http://localhost:8086/api/trains/stations`.

### 3. Viewing Container Logs

- View logs for all services:
  ```bash
  docker compose logs -f
  ```
- View backend logs:
  ```bash
  docker compose logs -f backend
  ```
- View frontend logs:
  ```bash
  docker compose logs -f frontend
  ```

### 4. Stopping Containers

- Stop containers (preserving data volume):
  ```bash
  docker compose down
  ```
- Stop containers and remove volumes:
  ```bash
  docker compose down -v
  ```

---

## 📦 Building Individual Docker Images Manually

If you need to build or push images to Docker Hub / Container Registries:

### Backend Image
```bash
# From app directory
cd app
docker build -t train-booking-backend:latest -f Dockerfile .
```

### Frontend Image
```bash
# From app directory
cd app
docker build -t train-booking-frontend:latest -f Dockerfile.frontend .
```

---

## 🌐 Deploying to Production Cloud Platforms

### 1. Deploying on Render / Railway / Fly.io

- **Backend Service**:
  - Deploy `app/Dockerfile` as a Web Service.
  - Set Environment Variables:
    - `PORT`: `8086`
    - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<your-db-host>:3306/<db_name>`
    - `SPRING_DATASOURCE_USERNAME`: `<username>`
    - `SPRING_DATASOURCE_PASSWORD`: `<password>`
    - `JWT_SECRET`: `<secure-random-32-byte-key>`
    - `ALLOWED_ORIGINS`: `https://your-frontend-domain.com`

- **Frontend Service**:
  - Deploy `app/Dockerfile.frontend` as a Web Service or Static Site.
  - Set `VITE_API_BASE_URL` to `https://your-backend-domain.com/api`.

---

## 🔑 Environment Variables Reference

| Environment Variable | Default Value | Description |
|---|---|---|
| `PORT` | `8086` | Port Spring Boot listens on |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/ticket_booking_db` | Database JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `SQLfor2027` | Database password |
| `JWT_SECRET` | `this-is-a-temporary-dev-secret...` | 32+ byte secret key for signing JWTs |
| `ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Configurable CORS allowed origins |
| `VITE_API_BASE_URL` | `http://localhost:8086/api` or `/api` | Base URL for frontend API calls |
