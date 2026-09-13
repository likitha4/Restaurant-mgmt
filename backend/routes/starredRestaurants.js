const express = require("express");
const router = express.Router();
const pool = require("../db");
const { requireAuth } = require("../utils/auth");

router.get("/", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      ` 
      select r.id as restaurant_id, r.name, s.comment
      from starred_restaurants s
      join restaurants r on s.restaurant_id= r.id
      where s.user_id =$1
      `,
      [req.user.id],
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await pool.query(
      "insert into starred_restaurants (user_id, restaurant_id) values ($1,$2) ",
      [req.user.id, restaurantId],
    );
    const restaurant = await pool.query(
      "select id as restaurant_id , name from restaurants where id= $1",
      [restaurantId],
    );
    res.status(201).json(restaurant.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:restaurantId", requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      " select * from starred_restaurants where user_id= $1 and restaurant_id=$2",
      [req.user.id, req.params.restaurantId],
    );
    if (existing.rows.length == 0) return res.sendStatus(404);
    if (existing.rows[0].user_id !== req.user.id) {
      return res
        .status(403)
        .json({
          message: "Only the person who commented can edit this comment",
        });
    }
    const { newComment } = req.body;
    const result = await pool.query(
      "update starred_restaurants set comment=$1 where restaurant_id=$2 and user_id= $3 returning *",
      [newComment, req.params.restaurantId, req.user.id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:restaurantId", requireAuth, async (req, res) => {
  try {
    await pool.query(
      "delete from starred_restaurants where user_id =$1 and restaurant_id= $2",
      [req.user.id, req.params.restaurantId],
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
