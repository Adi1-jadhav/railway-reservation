# 🚆 Railway Reservation System

A full-stack **microservices-based Railway Reservation System** built with **Spring Boot**, **Spring Cloud**, and **React + Vite**. The system supports user authentication, train search, seat booking, and PNR status tracking through a clean UI connected to a distributed backend.

---

## 📐 Architecture Overview

```
                        ┌──────────────────┐
                        │   React + Vite   │  ← Frontend (Port 5173)
                        │   (railway-ui)   │
                        └────────┬─────────┘
                                 │ HTTP
                        ┌────────▼─────────┐
                        │   API Gateway    │  ← Single Entry Point (Port 8080)
                        │ Spring Cloud GW  │
                        └──┬──────┬────┬───┘
                           │      │    │
              ┌────────────▼┐  ┌──▼──┐ ┌▼──────────────┐
              │ Auth Service│  │Train│ │Booking Service │
              │  Port 9898  │  │Svc  │ │   Port 8083   │
              │  H2 in-mem  │  │8082 │ │  H2 in-mem    │
              └─────────────┘  └──┬──┘ └───────────────┘
                                  │
                        ┌─────────▼────────┐
                        │ Discovery Server │  ← Eureka (Port 8761)
                        │  (Eureka Server) │
                        └──────────────────┘
```

---

## 🧩 Microservices

| Service | Port | Description |
|---|---|---|
| `discovery-server` | `8761` | Eureka Service Registry — all services register here |
| `api-gateway` | `8080` | Spring Cloud Gateway — routes all client requests |
| `auth-service` | `9898` | JWT-based registration & login |
| `train-service` | `8082` | Train, Station, and Route management |
| `booking-service` | `8083` | Seat booking and PNR tracking |
| `railway-ui` | `5173` | React + Vite frontend |

---

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.2.4**
- **Spring Cloud 2023.0.0** (Eureka, Gateway)
- **Spring Security** with **JWT** (HS256)
- **Spring Data JPA**
- **H2 In-Memory Database**
- **Lombok**
- **Maven** (multi-module)

### Frontend
- **React 18**
- **Vite 5**
- **React Router DOM v6**
- **Axios**
- **Framer Motion**
- **Lucide React**

---

## 📁 Project Structure

```
railway-reservation/
├── pom.xml                         # Parent Maven POM
├── discovery-server/               # Eureka service registry
├── api-gateway/                    # Spring Cloud API Gateway
├── auth-service/                   # JWT auth (register/login)
│   └── src/main/java/.../auth/
│       ├── controller/             # AuthController
│       ├── entity/                 # User entity
│       ├── dto/                    # AuthRequest, UserRegistrationDto
│       ├── repository/             # UserRepository
│       ├── security/               # JwtUtils
│       ├── service/                # AuthService, CustomUserDetailsService
│       └── config/                 # SecurityConfig
├── train-service/                  # Train & route management
│   └── src/main/java/.../train/
│       ├── controller/             # TrainController
│       ├── entity/                 # Train, Station, Route
│       ├── repository/
│       └── service/                # TrainService
├── booking-service/                # Seat booking & PNR
│   └── src/main/java/.../booking/
│       ├── controller/             # BookingController
│       ├── entity/                 # Booking
│       ├── repository/
│       └── service/                # BookingService
└── railway-ui/                     # React frontend
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── api/                    # Axios instance
        ├── components/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Home.jsx
        │   ├── Booking.jsx
        │   ├── PnrStatus.jsx
        │   ├── AdminDashboard.jsx
        │   └── Navbar.jsx
        └── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Java 21+
- Maven 3.8+
- Node.js 18+ and npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/Adi1-jadhav/railway-reservation.git
cd railway-reservation
```

---

### 2. Build All Backend Services

```bash
mvn clean install -DskipTests
```

---

### 3. Start Services (in order)

> ⚠️ **Order matters** — start the Discovery Server first, then the Gateway, then the rest.

**Step 1 — Discovery Server (Eureka)**
```bash
cd discovery-server
mvn spring-boot:run
```
> Open: http://localhost:8761

**Step 2 — API Gateway**
```bash
cd ../api-gateway
mvn spring-boot:run
```

**Step 3 — Auth Service**
```bash
cd ../auth-service
mvn spring-boot:run
```
> H2 Console: http://localhost:9898/h2-console

**Step 4 — Train Service**
```bash
cd ../train-service
mvn spring-boot:run
```

**Step 5 — Booking Service**
```bash
cd ../booking-service
mvn spring-boot:run
```
> H2 Console: http://localhost:8083/h2-console

---

### 4. Start the Frontend

```bash
cd ../railway-ui
npm install
npm run dev
```
> Open: http://localhost:5173

---

## 🔌 API Endpoints

All requests go through the **API Gateway at port 8080**.

### Auth Service — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |

### Train Service — `/api/trains`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/trains` | Get all trains |
| `GET` | `/api/trains/search` | Search trains by source/destination |

### Booking Service — `/api/bookings`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings/pnr/{pnr}` | Get booking by PNR |
| `GET` | `/api/bookings/user/{userId}` | Get all bookings by user |

---

## 🔐 Authentication

The system uses **JWT (JSON Web Tokens)** for stateless authentication.

1. Register or login via `/api/auth`
2. Receive a JWT token in the response
3. Pass the token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your-token>
   ```

**Token Configuration (auth-service):**
- Algorithm: `HS256`
- Expiry: `3600000 ms` (1 hour)
- Secret: Base64-encoded key in `application.properties`

---

## 🌐 Service Discovery

All services register with **Eureka** at startup. You can view the registry dashboard at:

```
http://localhost:8761
```

The API Gateway uses **load-balanced routing** (`lb://service-name`) to forward requests.

---

## 🗄️ Database

Each service uses its own **H2 in-memory database** (data resets on restart):

| Service | JDBC URL | H2 Console |
|---|---|---|
| auth-service | `jdbc:h2:mem:authdb` | http://localhost:9898/h2-console |
| booking-service | `jdbc:h2:mem:bookingdb` | http://localhost:8083/h2-console |

> For production use, replace H2 with MySQL/PostgreSQL in `application.properties`.

---

## 🌱 Seed Data

A PowerShell seed script is included to populate initial train/station data:

```powershell
# Run from the project root (PowerShell)
.\seed_data.ps1
```

---

## 🖥️ Frontend Features

- **User Registration & Login**
- **Train Search** by source and destination
- **Seat Booking** with passenger details
- **PNR Status Lookup**
- **Admin Dashboard**
- Responsive UI with animations (Framer Motion)

---

## 📦 Environment / Configuration

Key properties per service (`src/main/resources/application.properties`):

| Service | Key Properties |
|---|---|
| api-gateway | Port `8080`, Eureka URL, route predicates |
| auth-service | Port `9898`, H2 DB, JWT secret & expiry |
| train-service | Port `8082`, H2 DB, Eureka URL |
| booking-service | Port `8083`, H2 DB, Eureka URL |
| discovery-server | Port `8761` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> Built with ❤️ using Spring Boot Microservices + React
