const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const chatController = require("./controllers/chatAiHelper");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Mouad AI app",
  });
});

//what happens when someone hits my chat endpoint

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        status: "error",
        message: "Prompt is required",
      });
    }
// Send it to the AI handler function
    const response = await chatController.processChatRequest(prompt);

    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.error("Error processing chat request:", error);

    res.status(500).json({
      status: "error",
      message:
        error.message || "An error occurred while processing your request",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);

  if (process.env.NODE_ENV === "development") {
    process.exit(1);
  }
});
