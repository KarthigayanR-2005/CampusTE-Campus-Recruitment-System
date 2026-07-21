import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "CampusTE backend server is running",
  });
});

app.get("/api/health", (request, response) => {
  response.status(200).json({
    success: true,
    status: "healthy",
    message: "CampusTE API is working",
    timestamp: new Date().toISOString(),
  });
});

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "API route not found",
  });
});

app.listen(PORT, () => {
  console.log(
    `CampusTE backend running at http://localhost:${PORT}`
  );
});