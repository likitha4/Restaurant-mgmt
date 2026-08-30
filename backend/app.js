const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const restaurantsRouter = require("./routes/restaurants");
// const reviewsRouter = require("./routes/reviews");
const starredRestaurantsRouter = require("./routes/starredRestaurants");
const pool= require("./db");

const cors = require("cors");

const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://restaurant-mgmt-weld.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/restaurants/starred", starredRestaurantsRouter);
app.use("/restaurants", restaurantsRouter);
// app.use("/reviews", reviewsRouter);

module.exports = app;
