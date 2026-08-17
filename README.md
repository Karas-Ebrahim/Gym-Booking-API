# 🏋️ Gym Booking API

## Project Description

Our project is a **Gym / Fitness Class Booking API** designed to manage gym classes, trainers, members, and class bookings through a secure backend system.

The system allows trainers to create and manage their own fitness classes, while members can browse available classes, book available spots, and manage their own bookings.

The API also handles authentication, authorization, validation, class capacity, and booking rules to provide a reliable and organized online gym booking experience.

---

## Group Members & Roles

### Karas Ebrahim

**Authentication, Authorization & Integration**

* User authentication
* JWT-based authorization
* Password hashing using bcrypt
* Role-based access control
* Integrating the different project components

### Youssef Shaaban

**Class Sessions**

* Class Session model
* Class Session CRUD operations
* Search & filtering
* Trainer ownership validation

### Moaz Shaaban

**Bookings**

* Booking model
* Booking creation
* Booking cancellation
* Member booking management
* Capacity and duplicate booking rules

### Ziad Tarek

**Validation**

* User input validation
* Class Session validation
* Booking validation

---

## User Roles

### Trainer

* Register and login
* Create class sessions
* Update their own classes
* Delete their own classes
* View bookings for their classes

### Member

* Register and login
* Browse available classes
* Search and filter classes
* Book a class
* View their own bookings
* Cancel their own bookings

---

## Core Models

### User

```text
User {
    fullName: String,
    email: String,
    password: String,
    role: "Member" | "Trainer"
}
```

### ClassSession

```text
ClassSession {
    title: String,
    trainer: ObjectId,
    startAt: Date,
    endAt: Date,
    capacity: Number
}
```

### Booking

```text
Booking {
    session: ObjectId,
    member: ObjectId,
    status: "booked" | "cancelled"
}
```

---

## Objectives

* Build a secure backend API for gym class management and bookings.
* Implement authentication and role-based authorization.
* Allow trainers to manage their own class sessions.
* Allow members to book and manage their own bookings.
* Prevent duplicate bookings and overbooking.
* Validate user and booking data.
* Document and deploy the API for public use.

---

## Business Rules

* A member cannot book a full class.
* A member cannot book the same class twice.
* A member can only cancel their own booking.
* A cancelled booking frees a spot in the class.
* A trainer cannot modify another trainer's class.
* Classes can only be created for future time slots.
* Capacity must be a positive integer.

---

## Tools & Technologies

* **Backend:** Node.js, TypeScript, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, bcrypt
* **Environment Management:** dotenv
* **API Documentation:** Swagger / OpenAPI
* **API Testing:** Postman
* **Deployment:** Render / Railway
* **Version Control:** GitHub

---

## API Structure

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Class Sessions

```text
GET    /api/classes
GET    /api/classes/:id
POST   /api/classes
PATCH  /api/classes/:id
DELETE /api/classes/:id
```

### Bookings

```text
POST  /api/bookings
GET   /api/bookings/me
PATCH /api/bookings/:id/cancel
```

---

## Documentation & Deployment

### Swagger

```text
/api-docs
```

### Deployment

The API will be deployed to **Render / Railway** and the production URL will be added here after deployment.

---

## Version Control

The project source code is managed using **Git and GitHub**.

The repository is public and contains the complete backend implementation, documentation, and deployment configuration.
