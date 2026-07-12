# Employee Management System

A Full Stack Web Application developed to manage employee information, attendance, leave requests, performance, and resumes.

## 🚀 Technologies Used

### Frontend
- React JS
- JavaScript
- HTML
- CSS
- Axios
- React Router

### Backend
- Python
- Flask
- JWT Authentication
- Flask-CORS

### Database
- PostgreSQL


## 📌 Features

### Authentication
- User Registration
- User Login
- JWT Based Authentication
- Role Based Access Control


### Employee Management
- Add Employee
- View Employee Details
- Update Employee
- Delete Employee
- Search Employee


### Dashboard
- Total Employees
- Departments
- Salary Overview
- Recent Employees


### Attendance Management
- Mark Attendance
- View Attendance Records


### Leave Management
Employee:
- Apply Leave
- View Own Leave Status

HR / Manager:
- View All Leave Requests
- Approve Leave
- Reject Leave

HR:
- Delete Leave


### Resume Management
- Upload Resume
- Manage Employee Resume Details


### Performance Management
- Add Performance Details
- View Employee Performance


## 🏗 Project Structure
EMPLOYEE-MANAGEMENT-SYSTEM

│
├── backend
│ ├── Flask API
│ ├── JWT Authentication
│ └── PostgreSQL Connection
│
├── frontend
│ ├── React Components
│ ├── Pages
│ └── CSS Styling
│
└── README.md



## 🔐 User Roles

| Role | Access |
|------|--------|
| Employee | Apply Leave, View Profile, Attendance |
| Manager | Manage Employees, Approve Leave |
| HR | Full Management Access |


## ⚙️ Installation

### Backend Setup
cd backend

pip install -r requirements.txt

python app.py or py app.py


### Frontend Setup
cd frontend

npm install

npm run dev
