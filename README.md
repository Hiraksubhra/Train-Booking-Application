# 🚂 Train Booking Application

A full-stack train ticket booking application built with modern web technologies and a robust backend API. This project demonstrates a complete booking system with user authentication, train search, seat selection, and ticket management.

[![TypeScript](https://img.shields.io/badge/TypeScript-64.2%25-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Java](https://img.shields.io/badge/Java-35.3%25-007396?logo=openjdk)](https://www.java.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication
- 🔍 **Train Search** - Search trains by date, route, and availability
- 💺 **Seat Selection** - Interactive seat booking interface
- 🎫 **Ticket Management** - View and manage booked tickets
- 📱 **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- ⚡ **Real-time Updates** - React Query for efficient data fetching
- 🛡️ **Secure Backend** - Spring Boot with password hashing and JWT tokens
- 📊 **Database Persistence** - MySQL with JPA ORM

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: TanStack React Query
- **HTTP Client**: Axios
- **Date Handling**: date-fns & react-datepicker
- **UI Components**: Lucide React
- **Notifications**: Sonner

### Backend
- **Framework**: Spring Boot 3.2.4
- **Language**: Java 21
- **Database**: MySQL
- **ORM**: Spring Data JPA
- **Security**: Spring Security with JWT (jjwt)
- **Package Manager**: Maven
- **Build**: Maven with Spring Boot plugin

## 📁 Project Structure

```
Train-Booking-Application/
├── app/                          # Backend (Spring Boot API)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── ticket/booking/   # Application code
│   │   │   └── resources/            # Configuration files
│   │   └── test/                     # Unit tests
│   └── pom.xml                       # Maven configuration
│
├── frontend/                     # Frontend (React TypeScript)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services
│   │   ├── styles/              # CSS modules
│   │   └── App.tsx              # Main application component
│   ├── package.json             # Node.js dependencies
│   ├── tsconfig.json            # TypeScript configuration
│   ├── vite.config.ts           # Vite configuration
│   └── tailwind.config.ts       # Tailwind CSS configuration
│
└── README.md                     # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+)
- **npm** or **yarn**
- **Java** (JDK 21+)
- **Maven** (3.6+)
- **MySQL** (5.7+)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Hiraksubhra/Train-Booking-Application.git
cd Train-Booking-Application
```

### 2. Backend Setup (Spring Boot)

```bash
cd app

# Build the project
mvn clean install

# (Optional) Configure database connection
# Edit src/main/resources/application.properties if needed
```

### 3. Frontend Setup (React)

```bash
cd ../frontend  # or from root: cd Train-Booking-Application

# Install dependencies
npm install

# Configure environment variables if needed
# Create a .env file with backend API URL if necessary
```

## 🎯 Getting Started

### Running the Backend

```bash
cd app

# Start Spring Boot application
mvn spring-boot:run
```

The API will be available at `http://localhost:8080` (default port)

### Running the Frontend

```bash
cd frontend

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port)

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd app
mvn clean package
```

## 📚 API Documentation

The backend provides REST API endpoints for:

- **Authentication**: Login, registration, token refresh
- **Trains**: Search trains, get train details
- **Bookings**: Create booking, view bookings, cancel booking
- **Users**: User profile management

### Example Endpoints

- `POST /api/auth/login` - User login
- `GET /api/trains/search` - Search available trains
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/{userId}` - Get user's bookings

For detailed API documentation, refer to the backend API documentation or Spring Boot actuator endpoints.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and patterns
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is open source and available under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👤 Author

**Hiraksubhra**

- GitHub: [@Hiraksubhra](https://github.com/Hiraksubhra)

## 🐛 Troubleshooting

### Port Already in Use
If port 8080 (backend) or 5173 (frontend) are already in use, you can change them:
- **Backend**: Modify `server.port` in `application.properties`
- **Frontend**: Use `npm run dev -- --port 3000`

### Database Connection Issues
Ensure MySQL is running and credentials in `application.properties` are correct.

### CORS Issues
If frontend can't communicate with backend, check CORS configuration in Spring Boot.

## 📞 Support

For issues, questions, or suggestions, please open a [GitHub Issue](https://github.com/Hiraksubhra/Train-Booking-Application/issues).

---

**Happy Booking! 🎫🚂**
