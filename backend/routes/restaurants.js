const express = require("express");
const router = express.Router();
const pool = require("../db");
const { requireAuth } = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
    select r.id, r.name, r.address, r.description, r.created_by, coalesce(json_agg(c.name) filter (where c.name is not null),'[]') as cuisines
    from restaurants r 
    left join restaurant_cuisines rc on r.id=rc.restaurant_id
    left join cuisines c on rc.cuisine_id= c.id
    group by r.id
    order by r.created_at desc`);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("select * from restaurants  where id=$1", [
      req.params.id,
    ]);
    if (result.rows.length == 0) return res.sendStatus(404);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, address, description, cuisineIds } = req.body;
    const result = await pool.query(
      `
  insert into restaurants (name, address, description, created_by) values 
  ($1, $2, $3, $4) returning *`,
      [name, address, description, req.user.id],
    );
    const restaurant = result.rows[0];
    if (Array.isArray(cuisineIds)) {
      for (const cuisineId of cuisineIds) {
        await pool.query(
          "insert into restaurant_cuisines (restaurant_id, cuisine_id) values ($1,$2)",
          [restaurant.id, cuisineId],
        );
      }
    }
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return res
        .status(503)
        .json({
          message: "Database connection issue. Please try again shortly.",
        });
    }
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: " A restaurant with this address already exists." });
    }
    if (error.code === "42P01") {
      return res.status(500).json({ message: "Server configuration error." });
    }
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const existing = await pool.query("select * from restaurants where id=$1", [
      req.params.id,
    ]);
    if (existing.rows.length === 0) return res.sendStatus(404);
    if (existing.rows[0].created_by !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only the creator can delete this restaurant" });
    }
    await pool.query(
      "delete from restaurant_cuisines where restaurant_id= $1",
      [req.params.id],
    );
    await pool.query(
      "delete from starred_restaurants where restaurant_id= $1",
      [req.params.id],
    );
    await pool.query("delete from restaurants where id= $1", [req.params.id]);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const existing = await pool.query(
      " select * from restaurants where id= $1",
      [req.params.id],
    );
    if (existing.rows.length == 0) return res.sendStatus(404);
    if (existing.rows[0].created_by !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Only the creator can edit this restaurant" });
    }
    const { name, address, description } = req.body;
    const result = await pool.query(
      "update restaurants set name=$1, address=$2, description=$3 where id=$4 returning *",
      [name, address, description, req.params.id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
