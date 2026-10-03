# 🎯 GATE QUEST PRO

### GATE Preparation & Study Tracking Platform

GATE QUEST PRO is a full-stack web application designed to help students organize, track, and improve their GATE preparation from a single platform.

The platform provides tools for syllabus tracking, revision management, flashcards, mistake tracking, study planning, mock tests, analytics, and focused study sessions.

The application uses a React + Vite frontend and communicates with a Spring Boot REST API secured using JWT authentication.

---

## 🌐 Live Application

**Live Website:**  
https://gatequestpro.duckdns.org

---

## 📌 Project Overview

Preparing for GATE requires managing multiple activities such as:

- Completing the syllabus
- Revising important topics
- Tracking study progress
- Practicing questions
- Reviewing mistakes
- Taking mock tests
- Maintaining daily study goals

GATE QUEST PRO brings these activities together into one centralized platform.

The application allows users to create their own account and maintain their personal preparation data securely.

Each user's data is isolated so that one user cannot access another user's private study information.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Logout
- Token-based API Authorization
- User-specific data access

---

## 📊 Dashboard

The dashboard provides an overview of the user's preparation progress.

Features include:

- Overall preparation statistics
- Study progress
- Daily study activity
- Preparation tracking
- Quick access to important study modules

---

## 📚 Syllabus Tracking

Track your GATE syllabus from a centralized interface.

Features include:

- Subject-wise syllabus tracking
- Topic progress
- Completion tracking
- Preparation progress monitoring

---

## 🔄 Revision Management

Organize and track revision activities.

Features include:

- Add revision topics
- Track revision progress
- Manage revision tasks
- Monitor revision activities

---

## 🧠 Flashcards

Use flashcards for quick revision.

Features include:

- Create flashcards
- Edit flashcards
- Delete flashcards
- Review flashcards
- Topic-based revision

---

## ❌ Mistake Tracking

Keep track of mistakes made during preparation.

Features include:

- Record mistakes
- Review mistakes
- Track previously made mistakes
- Use mistakes as a revision resource

---

## 📅 Study Planner

Plan and track your daily preparation.

Features include:

- Study planning
- Daily targets
- Task management
- Study logs
- Preparation tracking

---

## 📝 Mock Tests

Track mock-test performance.

Features include:

- Record mock tests
- Track scores
- Monitor performance
- View preparation analytics

---

## 🎯 Focus Room

A dedicated area for focused study sessions.

Features include:

- Focus sessions
- Study activity tracking
- Time-based study sessions

---

## 📈 Analytics

The application provides progress information to help users understand their preparation activity.

Analytics include:

- Study activity
- Mock-test performance
- Preparation progress
- Revision activity
- Study statistics

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | User Interface |
| Vite | Frontend Build Tool |
| JavaScript | Application Logic |
| HTML5 | Structure |
| CSS3 | Styling |
| Tailwind CSS | UI Styling |
| Axios | API Communication |
| Lucide React | Icons |
| Chart.js | Data Visualization |
| React Chart.js 2 | React Chart Integration |

---

## Backend

| Technology | Purpose |
|---|---|
| Java | Backend Programming Language |
| Spring Boot | REST API Development |
| Spring Security | Application Security |
| JWT | Authentication |
| Spring Data JPA | Database Access |
| Maven | Dependency & Build Management |

---

## Database

| Technology | Purpose |
|---|---|
| PostgreSQL | Relational Database |
| AWS RDS | Production Database Hosting |

---

## Deployment & Infrastructure

| Technology | Purpose |
|---|---|
| AWS EC2 | Application Server |
| AWS RDS | Production Database |
| Nginx | Web Server & Reverse Proxy |
| Let's Encrypt | SSL/TLS Certificate |
| Certbot | SSL Certificate Management |
| DuckDNS | Domain |
| Ubuntu Linux | Server Operating System |

---

# 🏗️ System Architecture

```text
                         Internet
                            │
                            ▼
                  gatequestpro.duckdns.org
                            │
                         HTTPS
                            │
                            ▼
                     AWS EC2 Instance
                            │
                            ▼
                         Nginx
                       /        \
                      /          \
                     ▼            ▼
             React Frontend     /api
                                    │
                                    ▼
                              Spring Boot
                                Backend
                                    │
                             JWT Security
                                    │
                                    ▼
                             AWS RDS
                            PostgreSQL
```

---

# 🔐 Authentication Architecture

The application uses JWT-based authentication.

```text
                         User
                           │
                           ▼
                    Login / Register
                           │
                           ▼
                    Spring Boot API
                           │
                           ▼
                    Authentication
                           │
                           ▼
                       JWT Token
                           │
                           ▼
                      React App
                           │
                           ▼
                Authorization: Bearer Token
                           │
                           ▼
                    Protected APIs
```

---

# 🔒 Security

Security was considered throughout the application and deployment.

## Application Security

- JWT authentication
- Protected API endpoints
- Stateless authentication
- User ownership validation
- User data isolation
- Restricted CORS
- Environment-based configuration
- Passwords and secrets excluded from source code

## AWS Security

The EC2 Security Group exposes only the required public services.

```text
SSH      → Port 22
HTTP     → Port 80
HTTPS    → Port 443
```

The following services are not publicly exposed:

```text
Spring Boot → Port 8080
PostgreSQL  → Port 5432
```

The Spring Boot application is accessed through Nginx.

---

# 🌐 Production Request Flow

```text
Browser
   │
   │ HTTPS
   ▼
Nginx
   │
   ├──────────────► React Frontend
   │
   └── /api ──────► Spring Boot :8080
                         │
                         ▼
                    PostgreSQL RDS
```

---

# ⚙️ Environment Configuration

## Frontend

For local development, create:

```text
.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

For production:

```env
VITE_API_BASE_URL=/api
```

The production frontend uses `/api` so requests are routed through Nginx.

---

## Backend

The backend uses environment variables for sensitive configuration.

Example variable names:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION
```

Actual production values are stored securely on the server and are not included in this repository.

> ⚠️ Never commit database passwords, JWT secrets, private keys, `.pem` files, or other credentials to GitHub.

---

# 💻 Local Development

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Java 17
- Maven
- PostgreSQL

---

# 🚀 Frontend Setup

### 1. Clone the repository

```bash
git clone <YOUR-FRONTEND-GITHUB-REPOSITORY>
```

### 2. Enter the project directory

```bash
cd gate-quest-pro
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment file

Create:

```text
.env
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 5. Start development server

```bash
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

---

# 🏭 Production Build

Create a production build:

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

---

# 🧪 Testing

The application was tested across multiple areas.

## Authentication

- Registration
- Login
- Logout
- JWT authorization
- Protected routes

## Application Features

- Dashboard
- Syllabus
- Revision
- Flashcards
- Mistakes
- Planner
- Study Logs
- Mock Tests
- Focus Room
- Analytics

## Security

- User data isolation
- Ownership validation
- Unauthorized API access
- JWT validation
- Protected backend endpoints

## Database

- CRUD operations
- Data persistence
- User-specific records
- PostgreSQL integration

## Production

- Frontend deployment
- Backend deployment
- Nginx reverse proxy
- HTTPS
- CORS
- RDS connectivity
- Production authentication
- Database persistence

---

# 📂 Frontend Project Structure

```text
gate-quest-pro/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   ├── axiosConfig.js
│   │   └── ...
│   │
│   ├── components/
│   │   └── ...
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── useAuth.js
│   │
│   ├── hooks/
│   │   └── ...
│   │
│   ├── utils/
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .env.production
├── package.json
├── vite.config.js
└── README.md
```

---

# ☁️ AWS Deployment

The production application is deployed using AWS EC2 and AWS RDS.

## EC2

The EC2 instance hosts:

- Nginx
- React production build
- Spring Boot backend

## RDS

PostgreSQL is hosted using AWS RDS.

The database is not publicly exposed.

The EC2 instance communicates with the RDS database through the AWS network.

---

# 🌐 Nginx

Nginx performs two main jobs.

## 1. Serve React

```text
/
```

serves the React production build.

## 2. Reverse Proxy API Requests

```text
/api/*
```

is forwarded to:

```text
Spring Boot :8080
```

This allows the frontend and backend to operate under the same production domain.

---

# 🔒 HTTPS

HTTPS is configured using:

- Let's Encrypt
- Certbot
- Nginx

Production URL:

```text
https://gatequestpro.duckdns.org
```

HTTP requests are redirected to HTTPS.

Certificate renewal has also been tested using Certbot's dry-run process.

---

# 🔄 Backend Service Management

The Spring Boot backend runs as a Linux systemd service.

The service is configured to restart automatically if the application unexpectedly stops.

Conceptually:

```text
Spring Boot stops
       │
       ▼
systemd detects failure
       │
       ▼
Automatic restart
```

---

# 💾 Server Memory Configuration

The production EC2 instance uses swap space to provide additional virtual memory capacity.

Configured swap:

```text
2 GB
```

Swap is configured to persist across server reboots.

---

# 🔁 Deployment Flow

The production deployment process follows this general flow:

```text
Developer
   │
   ▼
GitHub
   │
   ▼
Build Frontend
   │
   ▼
React dist/
   │
   ▼
Nginx / EC2


Developer
   │
   ▼
Build Spring Boot
   │
   ▼
JAR
   │
   ▼
EC2
   │
   ▼
systemd
   │
   ▼
Spring Boot
```

---

# 📦 Backend API

The frontend communicates with the Spring Boot backend through REST APIs.

The production API base path is:

```text
/api
```

Authentication endpoints include:

```text
POST /api/auth/register
POST /api/auth/login
```

Other application APIs require JWT authentication.

---

# 👤 User Data Isolation

GATE QUEST PRO implements user-specific data access.

```text
User A
  │
  ├── Syllabus
  ├── Flashcards
  ├── Mistakes
  ├── Planner
  └── Mock Tests


User B
  │
  ├── Syllabus
  ├── Flashcards
  ├── Mistakes
  ├── Planner
  └── Mock Tests
```

User A cannot access User B's protected application data.

Ownership validation is enforced at the backend level.

---

# 📱 Responsive Design

The frontend is designed to provide a responsive experience across:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🎯 Project Goals

The primary goals of GATE QUEST PRO are:

- Centralize GATE preparation activities
- Track preparation progress
- Improve revision management
- Encourage consistent study habits
- Provide useful preparation analytics
- Maintain secure user-specific data
- Provide a scalable full-stack architecture

---

# 🚀 Future Improvements

Potential future enhancements include:

- AI-powered doubt assistance
- AI-generated quizzes
- AI lecture summarization
- Personalized learning recommendations
- AI-powered study planning
- Advanced performance analytics
- Notifications and reminders
- More detailed mock-test analysis
- Social/community learning features
- Mobile application

---

# 📸 Screenshots

Screenshots of the application can be added here.

Suggested screenshots:

- Login Page
- Register Page
- Dashboard
- Syllabus
- Revision
- Flashcards
- Mock Tests
- Analytics

---

# 📚 Learning Outcomes

This project provided practical experience with:

- React.js development
- REST API integration
- Spring Boot
- Spring Security
- JWT authentication
- PostgreSQL
- JPA/Hibernate
- Axios
- Git & GitHub
- AWS EC2
- AWS RDS
- Linux server administration
- Nginx
- HTTPS/SSL
- Certbot
- Production deployment
- Environment-based configuration
- Application security
- Database persistence
- Full-stack integration

---

# 👨‍💻 Author

## GATE QUEST PRO

**GATE Preparation & Study Tracking Platform**

Developed as a final-year engineering project.

---

# 📄 License

This project was developed for educational and academic purposes.
