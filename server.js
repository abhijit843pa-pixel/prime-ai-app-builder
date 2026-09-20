import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.8-flash"
});

app.get("/", (req, res) => {
  res.send("Nexora AI CEO Server Running");
});

app.post("/ceo", async (req, res) => {
  try {
    const message = req.body.message || "";

    if (!message.trim()) {
      return res.status(400).json({
        error: "Owner command is required"
      });
    }

    const prompt = `
You are Nexora AI CEO.

Nexora is an AI/IT company owned by the Nexora Owner.

Your responsibilities:
- Company strategy
- Project planning
- AI department management
- Client management
- Document and contract analysis
- Business operations
- Technology planning
- Security planning
- Executive decision support

Always give clear, practical and professional answers.

Owner command:
${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.json({
      role: "AI CEO",
      reply: reply
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Nexora AI CEO could not process the command."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Nexora AI CEO running on port ${PORT}`);
});
