import express from "express";
import dotenv from "dotenv";
import { collegechatbot } from "./chatbot.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(".")); // serve frontend

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Please enter a message." });
    }

    const reply = await collegechatbot(message);

    res.json({ reply });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.json({ reply: "Server error. Try again." });
  }
});

// START SERVER
const PORT = 1000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});