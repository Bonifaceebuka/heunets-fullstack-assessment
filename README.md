# 📦 Heunets Fullstack Assessment

This the complete sourcecode of Heunets Fullstack Assessment.

---

## 🛠️ System Requirements
This  project was built and tested on a Windows 11 64-bit Operating System with the following specifications:

- **Node.js**: Version 20.19.5
- **npm**: Version 10.8.2

---

## 🛠️ Tech Stack & Libraries Used for the Frontend

- **React.js**
- **TypeScript**
- **Vite**
- **Zustand**
- **Axios**
- **Tanstack Query**
- **Tailwind CSS**

---

### Frontend Installation

```bash
git clone https://github.com/Bonifaceebuka/heunets-fullstack-assessment.git
cd heunets-fullstack-assessment/frontend
cp .env.example .env
npm install
npm run dev
```

## 🛠️ Tech Stack & Libraries Used for the Backend

- **Node.js**
- **NestJS**
- **MongoDB**
- **Swagger UI**
- **Dotenv**
- **Passport JWT**

---

### Backend Installation

```bash
git clone https://github.com/Bonifaceebuka/heunets-fullstack-assessment.git
cd heunets-fullstack-assessment/backend
cp .env.example .env
Update update the environment variables to match your setup is locally
npm install
npm run dev
```

---
### Backend API Documentation
The API documentation of the backend part of this project is done using Swagger UI and it available at `http://localhost:YOUR-PORT/swagger/api` after running the backend server.

---

### Architectural Overview of the system

## BACKEND ARCHITECTURE

The system was designed to function a  monolithic application with two distinct layers the frontend and the backend. The frontend is responsible for the user interface and user experience while the backend is responsible for the business logic and data storage.

It was also designed using Service-to-service communication architecture where different modules within the backend communicate with each other using JWT-secured internal service-to-service calls. This ensures that the system is secure and that only authenticated services can communicate with each other.

This design can easily be converted into about 3 different microservices namely:
1. Auth microservice: responsible for user authentication and authorization
2. Projects microservice: responsible for project management
3. Tasks microservice: responsible for task management

And each of them can interact with each other independently via the authentication microservice that issues and validates JSON web tokens. This is called **A Gateway-based Service-to-service communication architecture**.

## FRONTEND ARCHITECTURE

The frontend was designed using a feature-based modular architecture where each feature is a separate module with its own components, hooks, stores, dtos, utilities etc.

Some of the features include:
1. Auth feature: responsible for user authentication and authorization
2. Projects feature: responsible for project management
3. Tasks feature: responsible for task management

---