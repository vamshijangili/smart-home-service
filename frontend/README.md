# Smart Home Service

A React + Vite project with navigation and backend integration for service requests.

## Features
- Home page with user and worker login options
- User login route and dashboard
- Worker login route and dashboard
- Service selection with route and workers listing
- Backend route: GET `/api/requests/:serviceType` (MongoDB)
- Global blue/white theme and responsive UI cards

## Installation

1. Install frontend dependencies:

   ```bash
   cd "c:\Users\jangili vamshi\OneDrive\Desktop\new project\smart home service"
   npm install
   ```

2. Install backend dependencies:

   ```bash
   cd "c:\Users\jangili vamshi\OneDrive\Desktop\new project\backend"
   npm install
   ```

## Running

1. Start backend:

   ```bash
   cd "c:\Users\jangili vamshi\OneDrive\Desktop\new project\backend"
   node server.js
   ```

2. Start frontend:

   ```bash
   cd "c:\Users\jangili vamshi\OneDrive\Desktop\new project\smart home service"
   npm run dev
   ```

3. Open `http://localhost:5173` (or next available port)

## Notes
- Ensure MongoDB URI is valid in `backend/server.js`.
- If port 5173 is busy, Vite chooses another port (e.g., 5174/5175).
- Use `npm start` in frontend after adding script `"start": "vite"`.

