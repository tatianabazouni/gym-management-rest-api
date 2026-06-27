# 🏋️ Gym Management REST API

> **CSC456 – Advanced Web Programming**
> **Project 2: Advanced Web API Development with Node.js, Express, MongoDB, and SQLite**

## 📖 Project Overview

The **Gym Management REST API** is a backend application developed using **Node.js** and **Express.js** that demonstrates the design and implementation of a modular RESTful Web API with persistent data storage.

The project combines **MongoDB (Mongoose)** and **SQLite (Sequelize)** to showcase both **NoSQL** and **SQL** database technologies within the same application.

It supports complete **CRUD (Create, Read, Update, Delete)** operations while implementing entity relationships including **many-to-one** and **many-to-many** associations.

---

# 🎯 Objectives

This project was developed to demonstrate the following concepts:

* RESTful API development using Express.js
* Modular backend architecture
* CRUD operations for multiple resources
* MongoDB integration using Mongoose
* SQLite integration using Sequelize
* Many-to-One relationships
* Many-to-Many relationships
* Database validation
* API testing using Postman
* Comparison between SQL and NoSQL persistence

---

# 🛠️ Technologies Used

| Technology | Purpose                         |
| ---------- | ------------------------------- |
| Node.js    | JavaScript Runtime              |
| Express.js | REST API Framework              |
| MongoDB    | NoSQL Database                  |
| Mongoose   | MongoDB ODM                     |
| SQLite     | Relational Database             |
| Sequelize  | SQLite ORM                      |
| dotenv     | Environment Variable Management |
| CORS       | Cross-Origin Requests           |
| Postman    | API Testing                     |

---

# 📂 Project Structure

```text
Gym-Management-REST-API/
│
├── config/
│   ├── mongodb.js
│   └── sqlite.js
│
├── controllers/
│   ├── trainerController.js
│   ├── workoutPlanController.js
│   ├── focusAreaController.js
│   └── feedbackController.js
│
├── models/
│   ├── Trainer.js
│   ├── WorkoutPlan.js
│   ├── FocusArea.js
│   └── Feedback.js
│
├── routes/
│   ├── trainerRoutes.js
│   ├── workoutPlanRoutes.js
│   ├── focusAreaRoutes.js
│   └── feedbackRoutes.js
│
├── postman/
│   └── Gym-Management-System.postman_collection.json
│
├── database.sqlite
├── app.js
├── server.js
├── package.json
├── .env.example
└── README.md
```

---

# 📊 Data Model

## MongoDB (Mongoose)

### Trainer

Stores trainer information including:

* Name
* Email
* Specialty

---

### Workout Plan

Stores workout plans including:

* Title
* Description
* Difficulty Level
* Assigned Trainer
* Focus Areas

---

### Focus Area

Represents muscle groups or fitness objectives.

Examples:

* Chest
* Legs
* Cardio
* Weight Loss
* Strength

---

## SQLite (Sequelize)

### Feedback

Stores standalone user feedback including:

* Message
* Rating (1–5)
* Timestamp

This entity is intentionally implemented using SQLite to demonstrate relational database persistence alongside MongoDB.

---

# 🔗 Entity Relationships

## Many-to-One

```
Trainer
    │
    ├──── Workout Plan
    ├──── Workout Plan
    └──── Workout Plan
```

One trainer can manage multiple workout plans.

Each workout plan belongs to exactly one trainer.

---

## Many-to-Many

```
Workout Plan
      ▲
      │
      ▼
 Focus Area
```

A workout plan can target multiple focus areas.

A focus area can belong to multiple workout plans.

---

# ✨ Features

* RESTful API architecture
* Modular project organization
* MongoDB data persistence
* SQLite data persistence
* CRUD operations for every entity
* Relationship handling using Mongoose references
* Input validation
* Error handling
* Environment variable configuration
* Postman collection included

---

# 📌 REST API Endpoints

## Trainers

* GET
* GET by ID
* POST
* PUT
* DELETE

---

## Workout Plans

* GET
* GET by ID
* POST
* PUT
* DELETE

---

## Focus Areas

* GET
* GET by ID
* POST
* PUT
* DELETE

---

## Feedback

* GET
* GET by ID
* POST
* PUT
* DELETE

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/gym-management-rest-api.git
```

Navigate to the project directory:

```bash
cd gym-management-rest-api
```

Install dependencies:

```bash
npm install
```

Configure environment variables by creating a `.env` file based on `.env.example`.

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

# 📮 API Testing

A complete Postman collection is included inside:

```
postman/
```

It contains requests for every endpoint and demonstrates all CRUD operations.

---

# 🗄️ Database Design

### MongoDB

Used for:

* Trainers
* Workout Plans
* Focus Areas

Chosen because of its flexible schema and easy handling of document relationships.

### SQLite

Used for:

* Feedback

Chosen to demonstrate relational database persistence using Sequelize ORM.

---

# 📚 Learning Outcomes

Through this project, the following backend development concepts were applied:

* Express.js application architecture
* REST API design principles
* CRUD implementation
* Mongoose schema design
* MongoDB document relationships
* Sequelize ORM
* SQLite integration
* API testing with Postman
* Environment variable management
* Modular backend development


# 📄 License

This project was developed for educational purposes as part of the CSC456 Advanced Web Programming course.
