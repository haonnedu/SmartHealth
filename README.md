# 🏥 SmartHealth - Modern Healthcare Platform

<div align="center">

![SmartHealth Logo](https://via.placeholder.com/150x150.png?text=SmartHealth)

[![CI/CD Pipeline](https://github.com/yourusername/smarthealth/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/smarthealth/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-EA2845?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Keycloak](https://img.shields.io/badge/Keycloak-EDF2F7?style=flat&logo=keycloak&logoColor=black)](https://www.keycloak.org/)

</div>

## 📋 Overview

SmartHealth is a modern, full-stack healthcare platform designed to streamline medical services and improve patient care. Built with cutting-edge technologies, it provides a seamless experience for both healthcare providers and patients.

### 🌟 Key Features

- 🔐 **Secure Authentication & Authorization**

  - Role-based access control
  - JWT-based authentication
  - Secure session management

- 👥 **User Management**

  - Patient registration and profiles
  - Healthcare provider management
  - Role-based permissions

- 📅 **Appointment System**

  - Online appointment booking
  - Real-time availability checking
  - Automated reminders

- 💊 **Medical Records**

  - Digital health records
  - Secure data storage
  - Easy access for authorized personnel

- 📱 **Modern User Interface**
  - Responsive design
  - Intuitive navigation
  - Accessible interface

## 🏗️ Architecture

SmartHealth follows a microservices architecture with the following components:

### Frontend (`web-app/clinic-website`)

- Built with Next.js 14
- TypeScript for type safety
- TanStack Query for state management
- Modern UI with Tailwind CSS
- Responsive and accessible design

### Backend Services

- **Identity Service** (`identity-service/`)

  - User authentication and authorization
  - Role management
  - JWT token handling

- **API Gateway** (`api-gateway/`)

  - Request routing
  - Rate limiting
  - API documentation

- **Web App Service** (`web-app-service/`)

  - Business logic
  - Appointment management
  - Medical records handling

- **Support Service** (`support-service/`)
  - Additional utilities
  - Support features

### Infrastructure

- **Database**: PostgreSQL
- **Authentication**: Keycloak
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x
- Java 17
- Docker and Docker Compose
- PostgreSQL 15
- Keycloak 22.x

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/smarthealth.git
   cd smarthealth
   ```

2. **Set up environment variables**

   ```bash
   # Copy example env files
   cp web-app/clinic-website/.env.example web-app/clinic-website/.env
   cp identity-service/.env.example identity-service/.env
   cp api-gateway/.env.example api-gateway/.env
   ```

3. **Start the development environment**

   ```bash
   docker-compose up -d
   ```

4. **Install dependencies and start services**

   ```bash
   # Frontend
   cd web-app/clinic-website
   npm install
   npm run dev

   # Backend services
   cd ../identity-service
   ./mvnw spring-boot:run

   cd ../api-gateway
   npm install
   npm run start:dev
   ```

5. **Access the applications**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:3001
   - Identity Service: http://localhost:8081
   - Keycloak: http://localhost:8080

## 🛠️ Development

### Code Structure

```
smarthealth/
├── web-app/                # Frontend application
│   └── clinic-website/    # Next.js application
├── identity-service/      # Authentication service
├── api-gateway/          # API Gateway
├── web-app-service/      # Main backend service
├── support-service/      # Support utilities
└── docker-compose.yml    # Docker configuration
```

### Available Scripts

#### Frontend

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Generate API types
npm run gen:api
```

#### Backend

```bash
# Identity Service
./mvnw spring-boot:run

# API Gateway
npm run start:dev
```

## 🔒 Security

- All API endpoints are protected with JWT authentication
- HTTPS enforced in production
- Role-based access control
- Secure password hashing
- Regular security audits
- GDPR compliant data handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer** - [Your Name](https://github.com/yourusername)
- **Backend Team** - [Team Members]
- **Frontend Team** - [Team Members]
- **DevOps** - [Team Members]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Keycloak](https://www.keycloak.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [TanStack Query](https://tanstack.com/query/latest)

---

<div align="center">
Made with ❤️ by Hao Nguyen.
</div>
