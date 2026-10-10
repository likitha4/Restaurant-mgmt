const express = require("express");
const router = express.Router();
const { requireAuth } = require("../utils/auth");

router.post("/generate-description", requireAuth, async (req, res) => {
  try {
    const { name, city, cuisines } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: "Restaurant name is required" });
    }

    const cityLine = city?.trim() ? `City:${city.trim()}` : "";
    const cuisineLine =
      Array.isArray(cuisines) && cuisines.length > 0
        ? `Cuisines: ${cuisines.join(", ")}`
        : "";
    const prompt = `
        Write a short, appealing restaurant description(2-3 sentences). Restaurant name (use exactly this name, do not change it): ${name.trim()} ${cityLine} ${cuisineLine} "
        Rules:
        -Use the restaurant name exactly as given.
        -Do not invent a city or location if none is provided.
        -Focus on food and atmosphere.
        -Warm, natural  tone.
        - No hashtags, no quotes.`.trim();
    const response = await fetch(
      `https://api.groq.com/openai/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content:
                "You write short restaurant descriptions only. Reply with the final description text and nothing else.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      (console.error(data), "Groq error");
      return res
        .status(500)
        .json({ message: data.error?.message || "AI generation failed" });
    }
    const description = (data.choices?.[0]?.message?.content || "").trim();
    if (!description) {
      return res.status(500).json({
        message: "AI returned an empty description. Try again",
      });
    }
    res.json({ description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
