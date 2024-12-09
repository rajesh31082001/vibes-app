import express from "express";
import OpenAI from "openai";

const router = express.Router();

// OpenAI configuration
const openai = new OpenAI({
  apiKey: "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",  // Ensure API key is used
});


// Route to handle chat messages
router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can change this to "gpt-4" if needed
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const botResponse = response.choices[0].message.content;
    res.json({ response: botResponse });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
