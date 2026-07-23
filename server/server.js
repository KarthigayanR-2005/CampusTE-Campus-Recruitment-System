import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {
  fileURLToPath,
} from "url";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

const environmentResult =
  dotenv.config({
    path: path.join(
      currentDirectory,
      ".env"
    ),
  });

if (environmentResult.error) {
  console.error(
    "Unable to load server/.env:",
    environmentResult.error.message
  );

  process.exit(1);
}

// Import database-dependent modules only
// after loading the environment variables.

const [
  { testDatabaseConnection },
  { default: authRoutes },
  { default: adminRoutes },
  { default: studentRoutes },
  {
    default:
      recruiterCompanyProfileRoutes,
  },
] = await Promise.all([
  import("./src/config/database.js"),
  import("./src/routes/authRoutes.js"),
  import("./src/routes/adminRoutes.js"),
  import("./src/routes/studentRoutes.js"),
  import(
    "./src/routes/recruiterCompanyProfileRoutes.js"
  ),
]);

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message:
      "CampusTE backend server is running",
  });
});

app.get(
  "/api/health",
  async (request, response) => {
    try {
      const databaseStatus =
        await testDatabaseConnection();

      response.status(200).json({
        success: true,
        status: "healthy",

        message:
          "CampusTE API and database are working",

        database: {
          connected: true,

          name:
            databaseStatus.databaseName,

          serverTime:
            databaseStatus.serverTime,
        },

        timestamp:
          new Date().toISOString(),
      });
    } catch (error) {
      console.error(
        "Database health check failed:",
        error.message
      );

      response.status(503).json({
        success: false,
        status: "unhealthy",

        message:
          "Database connection failed",

        database: {
          connected: false,
        },
      });
    }
  }
);

// Authentication routes

app.use(
  "/api/auth",
  authRoutes
);

// Admin routes

app.use(
  "/api/admin",
  adminRoutes
);

// Student routes

app.use(
  "/api/student",
  studentRoutes
);

// Recruiter routes

app.use(
  "/api/recruiter",
  recruiterCompanyProfileRoutes
);

// Keep the 404 handler after all valid routes.

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: "API route not found",
  });
});

async function startServer() {
  try {
    const databaseStatus =
      await testDatabaseConnection();

    console.log(
      `MySQL connected successfully to database: ${databaseStatus.databaseName}`
    );

    app.listen(PORT, () => {
      console.log(
        `CampusTE backend running at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Unable to connect to MySQL:",
      error.message
    );

    process.exit(1);
  }
}

startServer();