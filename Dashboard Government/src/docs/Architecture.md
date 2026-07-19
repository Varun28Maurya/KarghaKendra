# Architecture.md

# KarghaKendra

## 1. System Overview

KarghaKendra follows a client-server architecture with separate frontend applications for mobile and web, a centralized backend API, PostgreSQL as the primary database, Cloudinary for media storage, and Python-based AI services.

```
                        +----------------------+
                        |      Government      |
                        +----------+-----------+
                                   |
                                   |
                        +----------v-----------+
                        |     React Web App    |
                        +----------+-----------+
                                   |
                                   |
        +--------------------------+---------------------------+
        |                          |                           |
+-------v--------+        +--------v--------+         +--------v--------+
|  Buyer Portal  |        | Admin Dashboard |         | Future Portal   |
+----------------+        +-----------------+         +-----------------+

                                   |
                          HTTPS / REST API
                                   |
                        +----------v-----------+
                        | Node.js + Express.js |
                        +----------+-----------+
                                   |
      +----------------------------+-----------------------------+
      |                            |                             |
+-----v------+             +--------v-------+             +-------v------+
| PostgreSQL |             |   Cloudinary   |             | Python AI    |
| Database   |             | Images/Videos  |             | FastAPI       |
+------------+             +----------------+             +--------------+

                                   |
                           Socket.IO Server
                                   |
                        +----------v-----------+
                        |   Flutter Mobile App |
                        |      (Weavers)       |
                        +----------------------+
```

---

# 2. High Level Architecture

The platform consists of five major layers.

## Presentation Layer

Responsible for all user interfaces.

Components

- Flutter Mobile Application
- React Web Application

Users

- Weaver
- Cooperative Administrator
- Buyer
- Government

---

## Application Layer

Implemented using Node.js and Express.

Responsibilities

- Authentication
- Business Logic
- API Management
- Authorization
- Validation
- Notifications

---

## AI Layer

Implemented as independent Python services.

Responsibilities

- Demand Prediction
- Production Planning
- AI Assistant
- Recommendation Engine

---

## Data Layer

Stores all structured platform data.

Database

- PostgreSQL

Stores

- Users
- Orders
- Inventory
- Procurement
- Payments
- Products
- Cooperatives
- Notifications

---

## Media Layer

Stores all uploaded files.

Cloudinary stores

- Images
- Videos
- Reports
- Product Photos
- Verification Documents

---

# 3. User Access Architecture

```
                   Login

                      │

        OTP Verification

                      │

        Aadhaar Verification

                      │

      DigiLocker Verification

                      │

         Role Identification

                      │

        ┌───────┬─────────┬─────────┬────────────┐
        │       │         │         │
     Weaver   Admin     Buyer   Government
```

---

# 4. Module Architecture

```
Authentication
        │
        ▼
Dashboard
        │
        ▼
────────────────────────────────────

Member Management

Production Management

Inventory

Procurement

Marketplace

Finance

Communication

Notifications

AI

Reports

────────────────────────────────────
```

Each module is independent and communicates through secured REST APIs.

---

# 5. Backend Architecture

```
Client

↓

REST API

↓

Authentication Middleware

↓

Controller

↓

Service Layer

↓

Repository Layer

↓

PostgreSQL
```

Responsibilities

### Controllers

- Receive Requests
- Validate Input
- Return Responses

### Services

- Business Logic
- Calculations
- Data Processing

### Repository

- Database Queries
- CRUD Operations

---

# 6. Authentication Flow

```
User Opens App

↓

Enter Mobile Number

↓

Receive OTP

↓

Verify OTP

↓

(Optional)

Aadhaar Verification

↓

(Optional)

DigiLocker Verification

↓

JWT Generated

↓

Dashboard
```

---

# 7. Communication Flow

```
Flutter / React

↓

Socket.IO

↓

Node Server

↓

Receiver

↓

Real Time Notification
```

Used For

- Chat
- Order Updates
- Broadcast Messages
- Notifications

---

# 8. AI Architecture

```
PostgreSQL

↓

Historical Data

↓

Python AI Service

↓

Predictions

↓

Node API

↓

Frontend
```

Current AI Modules

- Demand Prediction
- Production Planning
- AI Assistant

Future AI Modules

- Quality Detection
- Smart Procurement
- Smart Pricing

---

# 9. Media Upload Flow

```
User Uploads Image

↓

Node API

↓

Cloudinary

↓

URL Generated

↓

PostgreSQL Stores URL

↓

Frontend Displays Media
```

---

# 10. Notification Architecture

```
System Event

↓

Notification Service

↓

Push Notification

↓

Flutter / React

↓

User
```

Notification Types

- Order Assigned
- Inventory Alert
- Payment Alert
- Procurement Alert
- Government Scheme
- Marketplace Updates

---

# 11. Data Flow

```
Frontend

↓

REST API

↓

Business Logic

↓

Database

↓

Response

↓

Frontend
```

---

# 12. Folder Architecture

```
karghakendra/

├── backend/
│
├── mobile/
│
├── web/
│
├── ai/
│
├── docs/
│
├── assets/
│
└── README.md
```

---

# 13. Backend Structure

```
backend/

src/

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── repositories/
├── utils/
├── validators/
└── server.js
```

---

# 14. Frontend Structure

## Flutter

```
mobile/

lib/

├── core/
├── models/
├── services/
├── screens/
├── widgets/
├── providers/
├── routes/
└── main.dart
```

---

## React

```
web/

src/

├── app/
├── components/
├── features/
├── services/
├── hooks/
├── context/
├── utils/
└── assets/
```

---

# 15. Security Architecture

Authentication

- OTP
- JWT
- Role-Based Access

Authorization

- Role Permissions
- Protected Routes

Data Security

- Encrypted Passwords
- HTTPS
- Secure APIs

---

# 16. Scalability

The architecture is modular and allows independent scaling of

- Backend APIs
- AI Services
- Database
- Media Storage
- Frontend Applications

Future modules can be integrated without major architectural changes.
