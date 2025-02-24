# Task Management Application

This is a minimal full-stack Task Management application developed as part of a coding challenge. It allows users to register, log in, and manage (create, update, and delete) their tasks. The application is built using:

- **Frontend:** React + TypeScript
- **Backend:** Node.js (Express) + TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT & bcrypt for secure password storage

The focus of this project is to deliver a clear, functional solution with core features.

---

## Project Overview

The Task Management app provides the following features:

- **User Authentication:**
  - Register a new user (`POST /auth/register`) with username and password (hashed using bcrypt).
  - Login an existing user (`POST /auth/login`) and receive a JWT for subsequent requests.

- **Task Management:**
  - **List Tasks:** `GET /tasks` fetches all tasks associated with the authenticated user.
  - **Create a Task:** `POST /tasks` lets users add new tasks (with title and optional description).
  - **Update a Task:** `PUT /tasks/:id` allows users to edit a task’s details or mark it complete/incomplete.
  - **Delete a Task:** `DELETE /tasks/:id` removes a task from the list.

- **User-Specific Task Isolation:**
  - Tasks are linked to the user via a `userId`, ensuring each user only accesses their own tasks.
---

## Prerequisites

Before starting, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14+ is recommended)
- npm
- [PostgreSQL](https://www.postgresql.org/)

---

## Backend Setup

### Environment Variables (Backend)

Create a `.env` file in the root of the folder with the following content:
DATABASE_URL=postgresql://username:password@localhost:5432/taskmanagerdb
JWT_SECRET=your_jwt_secret
PORT=5000

Replace:
- `username` and `password` with your PostgreSQL credentials.
- `taskmanagerdb` with your database name.
- `your_jwt_secret` with a secure secret key.

### Database Migrations

Before running the server, create the necessary tables in your PostgreSQL database.


## Starting the client side
navigate to the `client` directory in terminal use the command `npm run start`

## Starting the server side
navigate to the `server` directory in terminal use the command `npm run start`

A local host will be assigned and the app runs in the browser

## Demo link
https://drive.google.com/file/d/1Rv0335mZnzbH_KdACiurjVrBQDtmp305/view?usp=sharing

## Salary expectations
$5000-6000 per month 40 hours a week.

