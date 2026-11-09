# Restaurant Management System

A full-stack restaurant discovery app with authenticated users,  favorites, reviews and a responsive React dashboard.

## Features

- User registration, login and protected API routes.
- Restaurant CRUD with cuisine, neighborhood, price range, description and image metadata.
- Favorite/unfavorite flow scoped to the signed-in user.
- Visitor review feed with rating, visit type and comment history.
- Dashboard metrics for restaurant count, favorites and top-rated restaurants.
- Responsive React UI with search, cuisine filtering, review panel and mobile-friendly layouts.

## Tech Stack

- Frontend: React, Context API + reducer, CSS Grid/Flexbox.
- Backend: Node.js, Express,
- Auth: signed bearer token with PBKDF2 password hashing using Node crypto.
- Database: Postgresql

## Local Setup




Install and run the backend:

```bash
cd backend
npm install
npm start
```

Install and run the frontend:

```bash
cd frontend
npm install
npm start
```

The frontend uses `http://localhost:8000` by default. To point it elsewhere, set `REACT_APP_API_URL`.

## Donations (surplus food sharing)

Restaurant owners can post surplus food (type, quantity in kg, hours until it spoils). Anyone can browse the available donations. Only a restaurant's owner can post for it, and only the owner of a donation can edit or delete it. The feature lives at `/donations` on the Fork Find site.

```
Browser -> Fork Find (React) -> /donations (Vercel rewrite)
        -> donation-board (Next.js) -> donation-service (FastAPI + GraphQL) -> PostgreSQL (Neon)
```

Login stays with the Node backend. The Python service verifies the same signed token, using the same `JWT_SECRET`, so users don't log in twice.

**Tech:** Python, FastAPI, Strawberry GraphQL, SQLAlchemy, Next.js, TypeScript, Render, Vercel, Neon.

| Folder | What it is |
|---|---|
| `backend/` | Node/Express API: users, restaurants, login |
| `frontend/` | React app (Fork Find) |
| `donation-service/` | Python GraphQL service for donations |
| `donation-board/` | Next.js pages for browsing and posting donations |
