const express = require("express");
const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");
const { requireAuth } = require("../utils/auth");

const router = express.Router();

const serializeReview = (review) => ({
  id: review._id,
  restaurantId: review.restaurant._id || review.restaurant,
  rating: review.rating,
  comment: review.comment,
  visitType: review.visitType,
  user: {
    id: review.user._id,
    name: review.user.name,
  },
  createdAt: review.createdAt,
});

router.get("/restaurant/:restaurantId", requireAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.restaurantId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews.map(serializeReview));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/restaurant/:restaurantId", requireAuth, async (req, res) => {
  try {
    const { rating, comment, visitType } = req.body;
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    if (!restaurant) {
      return res.sendStatus(404);
    }

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    const review = await Review.create({
      restaurant: restaurant._id,
      user: req.user._id,
      rating,
      comment,
      visitType,
    });

    await review.populate("user", "name");

    res.status(201).json(serializeReview(review));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedReview = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deletedReview) {
      return res.sendStatus(404);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
