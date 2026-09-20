const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req,res)=>{
  res.send("Nexora AI CEO Server Running");
});

app.post("/ceo", async (req,res)=>{

  const message = req.body.message || "";

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const prompt = `
You are Nexora AI CEO.
Manage company strategy, projects, departments and give professional answers.

Owner command:
${message}
`;

  const result = await model.generateContent(prompt);
  const reply = result.response.text();

  res.json({
    role:"AI CEO",
    reply:reply
  });

});

app.listen(3000, ()=>{
 console.log("Nexora AI CEO running");
});
