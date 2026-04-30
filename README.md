# AuthKit

A production-grade React & Express authentication system featuring a premium UI, robust security, and an extensible design token architecture.

## Features
- **Premium Frontend:** Built with React, Vite, and Framer Motion for buttery smooth interactions.
- **Token-Driven UI:** A completely modular CSS Variable token system for effortless theming and spacing scaling.
- **Secure Backend:** Node.js + Express API with MongoDB.
- **Authentication:** JWT-based stateless authentication with Bcrypt password hashing.
- **Test Optimized:** QA-ready architecture with specialized end-to-end testing endpoints.

## Project Structure
- `/client`: React Vite SPA.
- `/server`: Node.js Express API.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB account (Atlas or local)

### 1. Backend Setup
1. Open a terminal and navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy the `.env.example` file to a new file named `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your `MONGO_URI` and a secure `JWT_SECRET`.
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on `http://localhost:5000`.*

### 2. Frontend Setup
1. Open a second terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend should now be running (usually on `http://localhost:3000` or `5173`).*

---

## Testing / QA
The application is pre-configured with endpoints to streamline testing:
- **`POST /api/test/create-user`**: Instantly bypasses validation to seed a test user.
- **`POST /api/test/reset`**: Purges the database to reset the application state.
*(Note: Ensure these routes are disabled in your production deployment!)*
