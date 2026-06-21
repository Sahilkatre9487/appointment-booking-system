# Appointment Booking System

## Technologies Used

* Java 21
* Spring Boot
* Spring Data JPA
* Spring Security
* MySQL
* Maven
* React (Frontend - In Progress)

## Features

* User Registration
* User Login
* Appointment Booking
* Service Management
* Role-Based Access (USER/ADMIN)
* REST APIs

## Project Structure

* Controller Layer
* Service Layer
* Repository Layer
* DTO Layer
* Entity Layer

## Setup Instructions

1. Clone the repository
2. Create MySQL database:

```sql
CREATE DATABASE appointment_db;
```

3. Update `application.properties` with your database credentials.
4. Run the Spring Boot application.

## APIs Implemented

* POST /auth/register
* POST /auth/login
* GET /users
* POST /appointments
* GET /appointments
* GET /services
* POST /services

## Future Enhancements

* JWT Authentication
* React Frontend
* Email Notifications
* Admin Dashboard
* Docker Deployment
