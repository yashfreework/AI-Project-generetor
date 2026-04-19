const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/generate", async (req, res) => {
  const { idea, mode } = req.body;

  try {
    let prompt = "";

    // 🔁 Mode logic
    if (mode === "stack") {
      prompt = `Suggest 'ONLY' the tech-stack for my: ${idea}

    Return:
  - Frontend
  - Backend
  - Database
  - Tools/APIs
  
  - which resources can be used
  `;
    } else {
      prompt = `
Create a structured project plan for: ${idea}.

Return in this format:

1. Project Overview
2. Features (bullet points)
3. Tech Stack
4. Timeline (day-wise)
5. Difficulty Level (Easy / Medium / Hard)
6. Estimated Completion Time
7. References
8. Research & Developments

Also create the PPT content for ${idea}:
9. PPT Content:
- Title
- Problem
- Solution
- Features
- Tech Stack

Keep it clean and structured.
    `;
    }

    // 🔗 OpenRouter API call
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data.choices[0].message.content;

    res.json({ result });

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;