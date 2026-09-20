const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nexora AI CEO Server Running");
});

app.post("/ceo", (req, res) => {
  const message = req.body.message?.toLowerCase() || "";

  let reply = "I am Nexora AI CEO. Please give me a clear command.";

  if(message.includes("report")){
    reply = "Nexora Company Report: All departments are active.";
  }

  if(message.includes("project")){
    reply = "Projects are being analyzed by Nexora AI CEO.";
  }

  if(message.includes("security")){
    reply = "Security monitoring is active.";
  }

  res.json({
    role:"AI CEO",
    reply: reply
  });
});

app.listen(3000, () => {
  console.log("Nexora AI CEO running on port 3000");
});nju
