# Restaurant Management System

A full-stack restaurant discovery app with authenticated users,  favorites, reviews and a responsive React dashboard.

## Features

- User registration, login and protected API routes.
- MongoDB models for users, restaurants, favorites and reviews.
- Restaurant CRUD with cuisine, neighborhood, price range, description and image metadata.
- Favorite/unfavorite flow scoped to the signed-in user.
- Visitor review feed with rating, visit type and comment history.
- Dashboard metrics for restaurant count, favorites and top-rated restaurants.
- Responsive React UI with search, cuisine filtering, review panel and mobile-friendly layouts.

## Tech Stack

- Frontend: React, Context API + reducer, CSS Grid/Flexbox.
- Backend: Node.js, Express, Mongoose.
- Auth: signed bearer token with PBKDF2 password hashing using Node crypto.
- Database: MongoDB Atlas or a local MongoDB instance.

## Local Setup

Create `backend/.env`:



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
