# Medusa — Clean Architecture Starter Template

> Portfolio project authored by **Nicolás Velah**  
> A backend starter template for new projects, preconfigured with **authentication**, **user management**, and **role-based access control**, following **Clean Architecture** and **Dependency Injection** principles.

---

## 🚀 Overview

This repository provides a solid foundation for building scalable backend applications. It includes:

- Authentication (JWT access & refresh)  
- User management (CRUD, profile endpoints)  
- Role management (role assignment & enforcement)  
- Secure password handling  
- Clean Architecture with Dependency Injection  
- Ready-to-extend controller and route structure  

The goal is to accelerate new projects by shipping with critical features already implemented.

---

## 🧱 Architecture

The codebase applies **Clean Architecture**:

- **Domain**: Core business models and contracts, independent of frameworks.  
- **Application (Use Cases)**: Encapsulated logic for authentication, user, and role management.  
- **Infrastructure**: Adapters for persistence, encryption, token services.  
- **Interface (HTTP)**: Express controllers and routes.  

**Dependency Injection** is centralized, so controllers resolve abstracted services without knowing concrete implementations. This makes the template testable, modular, and adaptable.

---

## 🔌 Routes & Controllers

All HTTP endpoints are organized under **routes** (parent routers) and **controllers** (handlers).  

### Auth (`/api/auth`)
- `POST /api/auth/signup` — register new user  
- `POST /api/auth/signin` — login with email/password  
- `POST /api/auth/refresh` — refresh access token  
- `GET /api/auth/me` — current authenticated user  

### Users (`/api/users`)
- `GET /api/users` — list all users (admin only)  
- `GET /api/users/:id` — get user by ID  
- `POST /api/users` — create new user (admin only)  
- `PUT /api/users/:id` — update user info  
- `DELETE /api/users/:id` — delete user (admin only)  

### Roles (`/api/roles`)
- `GET /api/roles` — list roles  
- `POST /api/roles` — create role (admin only)  
- `PUT /api/roles/:id` — update role  
- `DELETE /api/roles/:id` — remove role  

---

## 🛡️ Security

Security is built in at multiple levels:

- **Authentication**: JWT-based (access + refresh tokens).  
- **Password Hashing**: bcrypt with salt, ensuring no plain text passwords are stored.  
- **Authorization**: Role-based middleware (`requireRole("admin")`, etc.) applied at route level.  
- **Input Validation**: Controllers validate incoming DTOs before use cases execute.  
- **Error Handling**: Consistent error responses for `401 Unauthorized`, `403 Forbidden`, and validation failures.  
- **Best Practices**: 
  - Environment-driven secrets (no hardcoded keys).  
  - CORS restrictions configured.  
  - Rate-limiting recommended for login endpoints.  

---

## 📁 Folder Structure

```
src/
├── api/
│   ├── controllers/           # Route handlers (Auth, Users, Roles, etc.)
│   └── routes/                # Parent route definitions (mounted in server)
├── application/               # Use cases (auth flows, user mgmt, role mgmt)
├── domain/                    # Core entities, value objects, interfaces
├── infrastructure/            # DB adapters, token service, bcrypt hashing
├── dependency-injection.ts    # DI container / composition root
└── server.ts                  # App bootstrap (Express server, routes)
```

---

## ⚙️ Environment Variables

Example `.env` configuration:

```
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgres://user:pass@localhost:5432/medusa

# JWT
JWT_SECRET=replace_me
JWT_EXPIRES_IN=3600
REFRESH_TOKEN_SECRET=replace_me_too
REFRESH_TOKEN_TTL=2592000
```

---

## ⚡ Getting Started

```bash
# install dependencies
npm install

# run in dev mode
npm run dev

# build (if applicable)
npm run build

# start server
npm start
```

---

## 🧪 Testing

- Unit tests for domain and application layers (mocking repositories and services).  
- Integration tests for controllers (HTTP flows).  
- Security tests for role restrictions and token validation.  

---

## 🎯 Why Use This Template?

- Saves time — authentication and role-based access are already implemented.  
- Clean, modular codebase that can be extended easily.  
- Secure by default (JWT, bcrypt, role middleware).  
- Demonstrates professional backend architecture for production-ready systems.  

---

## 👤 Author

This project is authored and maintained by **Nicolás Velah**.  
It is part of a professional portfolio and serves as the starting point for new backend projects requiring authentication and role management.

---

## 📜 License

This project is the intellectual property of **Nicolás Velah**.  
It may be used for **educational and reference purposes**.  
For **commercial use**, explicit permission from the author is required.

---

## 🤝 For Recruiters / Hiring Managers

This project demonstrates:

- Implementation of **Clean Architecture** and **Dependency Injection** in Node.js/TypeScript.  
- Secure **JWT authentication** with refresh tokens.  
- **Role-based authorization** middleware and user management.  
- Modular controllers and route structure for scalability.  
- Professional coding standards, environment configuration, and error handling.  

It highlights the ability to deliver **production-ready backend systems** with a strong emphasis on maintainability, security, and developer experience.  
