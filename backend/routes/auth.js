const express = require("express");
const {
  createToken,
  hashPassword,
  requireAuth,
  verifyPassword,
} = require("../utils/auth");

const router = express.Router();
const pool= require("../db")
const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({
        message:
          "Name, email and a password of at least 6 characters are required",
      });
    }
    const existingUser = await pool.query(
      "select * from users where email=$1",
      [email],
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "An account already exists for this email." });
    }
    const passwordHash = hashPassword(password);
    const result = await pool.query(
      "insert into  users (email, password_hash,name) values ($1, $2, $3) returning *",
      [email, passwordHash, name],
    );
    const user = result.rows[0];
    return res
      .status(201)
      .json({
        token: createToken(user),
        user: publicUser(user),
        message: "Registered Successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("select * from users where email=$1", [
      email,
    ]);
    const result = user.rows[0];
    if (!result) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!verifyPassword(password, result.password_hash)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.json({ token: createToken(result), user: publicUser(result) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

module.exports = router;
