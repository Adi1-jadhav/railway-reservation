# Online Railway Ticket Reservation System (PakRail)

A modern, microservices-based railway reservation system built with Spring Boot and React.

## 📁 Project Structure

```text
railway-reservation/
├── discovery-server/   # Eureka Registry
├── api-gateway/        # Routing & Load Balancing
├── auth-service/       # JWT Security & User Management
├── train-service/      # Train & Schedule Management
├── booking-service/    # PNR & Reservation Management
└── railway-ui/         # React (Vite) Frontend
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js (v18+) & npm
- Maven

### Step 1: Run Backend Services
Open a terminal in the root directory and run each service (in separate terminals or via IDE):

1. **Discovery Server**: `cd discovery-server; mvn spring-boot:run`
2. **API Gateway**: `cd api-gateway; mvn spring-boot:run`
3. **Auth Service**: `cd auth-service; mvn spring-boot:run`
4. **Train Service**: `cd train-service; mvn spring-boot:run`
5. **Booking Service**: `cd booking-service; mvn spring-boot:run`

### Step 2: Run Frontend
1. `cd railway-ui`
2. `npm install`
3. `npm run dev`

Access the app at `http://localhost:3000`.

## 🛠 Features
- **Microservices Architecture**: Scalable and independent services.
- **Premium UI**: Dark-themed, glassmorphism design with responsive navigation.
- **JWT Auth**: Secure login for Users and Admins.
- **PNR Tracking**: Status check for any reservation.
- **Admin Control**: Manage trains and fares from a dedicated panel.
