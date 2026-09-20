import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://abhijit843pa-pixel.github.io");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite"
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

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
res.setHeader("Cache-Control", "no-cache, no-transform");
res.setHeader("Connection", "keep-alive");
res.setHeader("X-Accel-Buffering", "no");

const result = await model.generateContentStream(prompt);

for await (const chunk of result.stream) {
  const text = chunk.text();

  if (text) {
    res.write(text);
  }
}

res.end();

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
