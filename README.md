# QA & Automation Testing Sandbox (AuthKit)

This project is a sandbox environment designed explicitly for software testing and QA automation. It provides a complete, functional authentication system (Signup, Signin, Protected Dashboard) built on the MERN stack (MongoDB, Express, React, Node.js). 

The primary purpose of this repository is to serve as a target application for writing and executing automated UI and End-to-End (E2E) tests.

## Why this exists

If you are learning or building automation frameworks using tools like **Selenium**, **Cypress**, **Playwright**, or **Puppeteer**, you need a stable target application to run tests against. This project provides that target.

It features:
- Standard authentication flows (Signup, Login, Logout)
- Form validation (Regex for emails, strict password policies)
- Protected routes (A dashboard that requires a valid session)
- Dedicated API endpoints for seeding or wiping the database (to reset test state quickly)

---

## 🚀 How to Run Locally

To test against this application, you must run both the backend API and the frontend UI locally.

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB account (Atlas cluster) or a local MongoDB instance

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
   - Open `.env` and fill in your `MONGO_URI` and a dummy `JWT_SECRET`.
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(The API will run on `http://localhost:5000`)*

### 2. Frontend Setup
1. Open a second terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm run dev
   ```
   *(The UI will run on `http://localhost:5173` or `3000`)*

---

## 🧪 Testing Guidelines

Once the application is running, you can point your automation framework (e.g., Selenium WebDriver) to `http://localhost:5173`.

### Useful Endpoints for Automation
To make E2E testing reliable, you often need to reset the database to a known state before each test run. This API exposes two QA-specific endpoints for this exact purpose:

- **`POST http://localhost:5000/api/test/create-user`**: Instantly seeds a test user bypassing UI validation.
- **`POST http://localhost:5000/api/test/reset`**: Purges the entire user database to give you a clean slate.

### Future Roadmap
- Integration with Cypress and Playwright out of the box.
- Addition of mock user generation scripts.
- Dockerizing the application so testers can spin up the environment with a single `docker-compose up` command without needing to install Node or MongoDB locally.
