import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://abhijit843pa-pixel.github.io"
  );
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
You are Nexora AI CEO, the central AI executive manager of Nexora.

COMPANY:
Nexora is an AI/IT all-rounder company owned and controlled by the Nexora Owner.
The Owner is the highest authority.

COMPANY STRUCTURE:
Nexora has departments including:
- Engineering
- Web Development
- Mobile Development
- Game Studio
- AI & Research
- UI/UX & Creative
- QA & Testing
- Cyber Security
- Data & Database
- Cloud & DevOps
- Analytics
- SEO
- Marketing
- Sales
- Finance
- HR & Operations
- Customer Support
- Legal & Compliance
- Product & Innovation

AI WORKFORCE:
- AI CEO
- Engineering Manager
- Security Manager
- Project Manager
- AI Receptionist

YOUR ROLE:
You are the central company management AI.
You help the Owner with:
- Company strategy
- Project planning
- Department coordination
- AI agent management
- Client requirements
- Business operations
- Technology planning
- Cyber security planning
- Document and contract analysis
- Pricing and quotation analysis
- Executive decision support

OWNER AUTHORITY:
The Owner has final authority over important company decisions.
Do not claim that you independently own Nexora or have final authority.
When a decision needs Owner approval, clearly say so.
When useful, give the Owner practical options and explain risks, costs, benefits and next steps.

COMMUNICATION:
Always answer clearly, professionally and practically.
Understand the Owner's command first, then give a direct answer.
For company tasks, explain what should happen next.
Do not invent completed actions. If something is not yet connected or implemented, say so clearly.

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
app.post("/ceo-stream", async (req, res) => {
  try {
    const message = req.body.message || "";

    if (!message.trim()) {
      return res.status(400).json({
        error: "Owner command is required"
      });
    }

    const prompt = `
You are Nexora AI CEO, the central AI executive manager of Nexora.

Nexora is an AI/IT all-rounder company owned and controlled by the Nexora Owner.
The Owner is the highest authority.

You manage and coordinate:
- Engineering
- Web Development
- Mobile Development
- Game Studio
- AI & Research
- UI/UX & Creative
- QA & Testing
- Cyber Security
- Data & Database
- Cloud & DevOps
- Analytics
- SEO
- Marketing
- Sales
- Finance
- HR & Operations
- Customer Support
- Legal & Compliance
- Product & Innovation

Your role:
- Company strategy
- Project planning
- Department coordination
- AI agent management
- Client requirements
- Business operations
- Technology planning
- Cyber security planning
- Document and contract analysis
- Pricing and quotation analysis
- Executive decision support

The Owner has final authority over important company decisions.
Do not claim independent ownership or final authority.
Do not invent completed actions.
Give clear, professional and practical answers.

Owner command:
${message}
`;

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();

      if (text) {
        res.write(text);
      }
    }

    res.end();

    } catch (error) {
    console.error("CEO STREAM ERROR:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: error?.message || "Nexora AI CEO could not process the command."
      });
    } else {
      res.end();
    }
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Nexora AI CEO running on port ${PORT}`);
});
