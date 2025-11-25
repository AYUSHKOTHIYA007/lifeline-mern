# LifeLine – React + MongoDB (No Express)

This is a beginner-friendly project built with React and a custom Node.js backend.
**This version does not use the Express.js framework** and instead uses the native Node.js `http` module to handle server requests.

## How to Run This Project

### Prerequisites
- You must have **Node.js** installed.
- You must have **MongoDB** installed and running on `mongodb://localhost:27017`.

### 1. Backend Setup

```bash
# 1. Navigate into the backend folder
cd backend

# 2. Install packages (mongoose and cors)
npm install

# 3. Start the backend server
node server.js