# 💰 personal-finance-microservice-app

**Personal Finance Management System**  
A modern, full-stack web application built using **Spring Boot (Microservices)** and **Angular**, designed to help users track income, expenses, budgets, and reports with ease.

---
## 📸 Screenshots

![image](https://github.com/user-attachments/assets/820d619c-9b8f-488f-bbc4-495d14d3729e)
![image](https://github.com/user-attachments/assets/8dc0200e-5775-4b84-b3cb-0e21cb111234)
![image](https://github.com/user-attachments/assets/59cd3814-2c00-4155-9bf2-dfac57fc3703)
![image](https://github.com/user-attachments/assets/344fdf06-8898-420d-af3b-e4ec883e886d)
![image](https://github.com/user-attachments/assets/863ae5c5-d19b-4146-8cac-a285e25bd074)
![image](https://github.com/user-attachments/assets/c52455a1-5ace-4d73-9690-d87e6d9a88df)

---
## 📌 Overview

This project is a **demo application** built using a **Microservices Architecture**. It aims to simplify daily money management by providing tools to:
- Track your income and expenses
- Set monthly budgets
- Generate financial reports
- Get notifications/reminders

It is structured to reflect real-world enterprise-level applications using best practices like:
- Service separation
- Secure APIs
- Gateway routing
- CI/CD-ready setup

---

## 🏗️ Architecture

The application follows a **Microservice Architecture** using Spring Boot and Spring Cloud. Each business module is its own independent service, and they communicate through REST APIs.

### 🔧 Tech Stack

| Layer        | Technology                                      |
|--------------|--------------------------------------------------|
| Frontend     | Angular, TypeScript, HTML5, CSS3                |
| Backend      | Java 17, Spring Boot, Spring Cloud              |
| API Gateway  | Spring Cloud Gateway                            |
| Auth Service | Spring Security, OAuth2, JWT                    |
| Database     | MySQL                                           |
| DevOps       | Docker, Docker Compose                          |
| Config Mgmt  | Spring Cloud Config                             |
| Service Reg. | Eureka Discovery Service                        |

---

## 🧱 Modules (Microservices)

### 🛡️ `auth-service`
Handles user authentication using **JWT tokens** and **OAuth2**. Manages login, registration, and token validation.

### 🚪 `gateway-service`
Acts as a single entry point. Routes requests to appropriate backend services.

### 🔎 `discovery-service`
Eureka service registry for locating microservices at runtime.

### ⚙️ `config-service`
Centralized configuration management using Spring Cloud Config Server.

### 👤 `income-service`
Manages user income entries with category and date support.

### 💸 `expense-service`
Handles user expense tracking with filtering and categorization.

### 📊 `report-service`
Generates summary reports including monthly/yearly financial stats.

### 💬 `notification-service` *(Optional)*
Sends email or system notifications about budget limits or irregular activity.

### 📁 `pf-app-config-repo`
Houses external configuration files used by config-service.

### 🌐 `personal-finance-ui`
The **Angular frontend**. Offers an intuitive dashboard to interact with all backend services.

---

## 📷 UI Features (personal-finance-ui)

- Login/Register with JWT token
- Add, edit, delete income and expenses
- Dashboard with summary graphs (monthly/annual trends)
- Budget setup with visual alerts
- Financial reports download
- Responsive UI for desktop & mobile

---

## 🐳 Deployment with Docker

To quickly run the full system using Docker:

```bash
docker-compose up --build
