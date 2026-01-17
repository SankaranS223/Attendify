# 📊 Attendify – Attendance Management System

Attendify is a full-stack Attendance Management System designed to manage daily attendance, subject-wise attendance, alerts, and analytics for educational institutions.  
The system supports Admin and Student roles with secure JWT-based authentication.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based login
- Role-based access control (ADMIN / STUDENT)
- Protected frontend routes
- Secure backend APIs

---

### 👨‍🏫 Admin Features
- Dashboard displaying:
  - Total students
  - Total subjects
  - Daily attendance percentage
- Student management (CRUD)
- Subject management
- Mark **daily attendance**
- Mark **subject-wise attendance**
- View today’s attendance (daily & subject-wise)
- Send manual alerts to students

---

### 🎓 Student Features
- View daily attendance percentage
- View alerts sent by admin
- View subject-wise attendance history
- Secure access using JWT authentication

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- MySQL
- JPA / Hibernate

### Frontend
- React (Vite)
- Axios
- React Router DOM
- CSS (custom styling)

---

## 🔄 Application Flow

1. User logs in using email and password
2. Backend generates JWT token with userId and role
3. Token is stored on the frontend
4. Protected routes verify role and authentication
5. Backend validates JWT on each request
6. Attendance and alerts are stored in MySQL database

---

## 🧠 Key Design Decisions

- `userId` is used as JWT subject (immutable and relational)
- Role stored inside JWT to avoid database lookup on each request
- Stateless authentication using JWT
- All critical data stored in database (no data loss on token expiry)

---

## ⚙️ Setup Instructions

### Backend Setup
1. Configure MySQL database
2. Update database credentials in `application.properties`
3. Run the Spring Boot application

### Frontend Setup

---

## 📌 Notes
- JWT token expires after configured time (default: 1 hour)
- On token expiry, user is redirected to login
- No data loss occurs as all data is persisted in MySQL

---

## ✅ Project Status
✔ Individual Project  
✔ Full-stack implementation  
✔ Ready for submission / evaluation



### Backend
