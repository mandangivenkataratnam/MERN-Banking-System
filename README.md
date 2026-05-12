# Tech Bank - Full Stack Banking Management System

## Project Overview

Tech Bank is a modern full-stack banking management system developed using the MERN stack. The application helps manage customers, branches, transactions, and user authentication through a clean and responsive dashboard interface. 

This project was built to practice real-world full-stack development concepts including REST APIs, MongoDB integration, CRUD operations, authentication, routing, and responsive UI design.

---

# Live Features

## Authentication System

* Admin Login
* Customer Login
* Role-based UI
* Persistent login using localStorage
* Profile section with user image and details

---

## Dashboard

* Banking statistics cards
* Recent transactions table
* Responsive dashboard layout
* Modern card-based UI

---

## Customer Management

### Features

* Add customer
* Edit customer
* Delete customer
* Search customer
* Data stored in MongoDB
* Real-time UI updates

### Customer Fields

* Name
* Email

---

## Branch Management

### Features

* Add branch
* View branch details
* Edit branch
* Delete branch
* Modal-based UI
* MongoDB integration

### Branch Fields

* Branch Name
* Manager Name
* Phone Number
* Location
* Email

---

## Transaction Management

### Features

* Add transaction
* Edit transaction
* Delete transaction
* Search transaction
* Transaction status badges
* Credit/Debit types
* MongoDB integration

### Transaction Fields

* Sender
* Receiver
* Amount
* Type
* Status
* Date

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS3
* React Icons
* Vite

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv
* Nodemon

---

# Folder Structure

```bash
Tech-Bank/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# MongoDB Collections

## users

Stores login users.

```json
{
  "name": "Venkataratnam",
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "Admin"
}
```

---

## customers

Stores customer details.

```json
{
  "name": "Rahul",
  "email": "rahul@gmail.com"
}
```

---

## branches

Stores branch details.

```json
{
  "branch": "Hyderabad Main Branch",
  "manager": "Rajesh Kumar",
  "phone": "+91 9876543210",
  "location": "Hyderabad",
  "email": "hyderabad@techbank.com"
}
```

---

## transactions

Stores transaction details.

```json
{
  "sender": "Rahul",
  "receiver": "Priya",
  "amount": "₹15000",
  "type": "Credit",
  "status": "Success",
  "date": "07 May 2026"
}
```

---

# API Endpoints

## Authentication

| Method | Endpoint    | Description |
| ------ | ----------- | ----------- |
| POST   | /auth/login | User Login  |

---

## Customers

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /customers     | Get All Customers |
| POST   | /customers     | Add Customer      |
| PUT    | /customers/:id | Update Customer   |
| DELETE | /customers/:id | Delete Customer   |

---

## Transactions

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /transactions     | Get All Transactions |
| POST   | /transactions     | Add Transaction      |
| PUT    | /transactions/:id | Update Transaction   |
| DELETE | /transactions/:id | Delete Transaction   |

---

## Branches

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /branches     | Get All Branches |
| POST   | /branches     | Add Branch       |
| PUT    | /branches/:id | Update Branch    |
| DELETE | /branches/:id | Delete Branch    |

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/your-username/tech-bank.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on:

```bash
https://mern-banking-system-mvxw.onrender.com
```

---

# Environment Variables

Create `.env` file inside backend folder.

```env
MONGO_URI=your_mongodb_connection_string
```

---

# UI Features

* Responsive design
* Mobile friendly layout
* Modern banking dashboard
* Sidebar navigation
* Modal forms
* Interactive cards
* Transaction badges
* Search functionality
* Profile dropdown

---

# Challenges Faced

## MongoDB SRV DNS Error

Initially, MongoDB Atlas connection using SRV format failed because of DNS resolution issues.

### Solution

Used standard MongoDB connection string instead of SRV format.

---

## CRUD Synchronization

Frontend arrays initially caused data loss after refresh.

### Solution

Integrated MongoDB with Express API using Mongoose models.

---

# Future Improvements

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Dashboard Analytics Charts
* Employee Management Module
* Notifications System
* Transaction Filtering
* Export Reports
* Dark Mode
* Deployment on Render and Vercel

---

# Learning Outcomes

This project helped in understanding:

* REST API development
* MongoDB database integration
* MERN architecture
* CRUD operations
* Component-based UI design
* State management using React hooks
* Role-based rendering
* API integration using Axios
* Responsive web design
* Backend routing structure

---

# Author

## Venkataratnam Mandangi

Full Stack Developer

### Skills

* HTML
* CSS
* JavaScript
* React.js
* Node.js
* Express.js
* MongoDB
* Python
* Bootstrap

---

# Conclusion

Tech Bank is a complete MERN stack banking management application focused on real-world CRUD operations, authentication, API integration, and responsive UI design. The project demonstrates practical full-stack development skills and provides a strong foundation for advanced backend security and deployment features.
