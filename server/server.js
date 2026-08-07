import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import {
  fileURLToPath,
} from "url";

const currentFilePath =
  fileURLToPath(
    import.meta.url
  );

const currentDirectory =
  path.dirname(
    currentFilePath
  );

const environmentResult =
  dotenv.config({
    path: path.join(
      currentDirectory,
      ".env"
    ),
  });

if (
  environmentResult.error
) {
  console.error(
    "Unable to load server/.env:",
    environmentResult
      .error
      .message
  );

  process.exit(1);
}

const [
  {
    testDatabaseConnection,
  },

  {
    default:
      authRoutes,
  },

  {
    default:
      publicOfferVerificationRoutes,
  },

  {
    default:
      adminRoutes,
  },

  {
    default:
      studentRoutes,
  },

  {
    default:
      recruiterCompanyProfileRoutes,
  },

  {
    default:
      recruiterJobRoutes,
  },

  {
    default:
      studentJobRoutes,
  },

  {
    default:
      studentApplicationRoutes,
  },

  {
    default:
      recruiterApplicantRoutes,
  },

  {
    default:
      recruiterInterviewRoutes,
  },

  {
    default:
      studentInterviewRoutes,
  },

  {
    default:
      notificationRoutes,
  },

  {
    default:
      offerRoutes,
  },
] = await Promise.all([
  import(
    "./src/config/database.js"
  ),

  import(
    "./src/routes/authRoutes.js"
  ),

  import(
    "./src/routes/publicOfferVerificationRoutes.js"
  ),

  import(
    "./src/routes/adminRoutes.js"
  ),

  import(
    "./src/routes/studentRoutes.js"
  ),

  import(
    "./src/routes/recruiterCompanyProfileRoutes.js"
  ),

  import(
    "./src/routes/recruiterJobRoutes.js"
  ),

  import(
    "./src/routes/studentJobRoutes.js"
  ),

  import(
    "./src/routes/studentApplicationRoutes.js"
  ),

  import(
    "./src/routes/recruiterApplicantRoutes.js"
  ),

  import(
    "./src/routes/recruiterInterviewRoutes.js"
  ),

  import(
    "./src/routes/studentInterviewRoutes.js"
  ),

  import(
    "./src/routes/notificationRoutes.js"
  ),

  import(
    "./src/routes/offerRoutes.js"
  ),
]);

const app =
  express();

const PORT =
  Number(
    process.env.PORT
  ) || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL ||
  "http://localhost:5173";

const PUBLIC_APP_URL =
  process.env.PUBLIC_APP_URL ||
  CLIENT_URL;

/*
|--------------------------------------------------------------------------
| Allowed frontend origins
|--------------------------------------------------------------------------
|
| localhost is kept for normal laptop development.
| CLIENT_URL and PUBLIC_APP_URL allow CampusTE to be accessed using the
| laptop Wi-Fi IP address from other devices on the same network.
|
*/

const allowedOrigins =
  Array.from(
    new Set(
      [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        CLIENT_URL,
        PUBLIC_APP_URL,
      ].filter(
        Boolean
      )
    )
  );

console.log(
  "CampusTE allowed frontend origins:",
  allowedOrigins
);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(
  cors({
    origin: (
      origin,
      callback
    ) => {
      /*
      |--------------------------------------------------------------------------
      | Requests without Origin
      |--------------------------------------------------------------------------
      |
      | Allows tools such as PowerShell, Postman and direct server requests.
      |
      */

      if (!origin) {
        return callback(
          null,
          true
        );
      }

      if (
        allowedOrigins.includes(
          origin
        )
      ) {
        return callback(
          null,
          true
        );
      }

      console.warn(
        `CORS blocked origin: ${origin}`
      );

      return callback(
        new Error(
          `CORS blocked origin: ${origin}`
        )
      );
    },

    credentials:
      true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(
  express.json({
    limit:
      "2mb",
  })
);

/*
|--------------------------------------------------------------------------
| Root route
|--------------------------------------------------------------------------
*/

app.get(
  "/",
  (
    request,
    response
  ) => {
    return response
      .status(200)
      .json({
        success:
          true,

        message:
          "CampusTE backend server is running",
      });
  }
);

/*
|--------------------------------------------------------------------------
| Health route
|--------------------------------------------------------------------------
*/

app.get(
  "/api/health",
  async (
    request,
    response
  ) => {
    try {
      const databaseStatus =
        await testDatabaseConnection();

      return response
        .status(200)
        .json({
          success:
            true,

          status:
            "healthy",

          message:
            "CampusTE API and database are working",

          database: {
            connected:
              true,

            name:
              databaseStatus
                .databaseName,

            serverTime:
              databaseStatus
                .serverTime,
          },

          server: {
            port:
              PORT,

            publicAppUrl:
              PUBLIC_APP_URL,

            allowedOrigins,
          },

          timestamp:
            new Date()
              .toISOString(),
        });
    } catch (error) {
      console.error(
        "Database health check failed:",
        error.message
      );

      return response
        .status(503)
        .json({
          success:
            false,

          status:
            "unhealthy",

          message:
            "Database connection failed",

          database: {
            connected:
              false,
          },
        });
    }
  }
);

/*
|--------------------------------------------------------------------------
| Authentication routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/auth",
  authRoutes
);

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
|
| Must remain before routers mounted directly on "/api".
|
| GET /api/public/offer-verifications/:publicId?token=...
|
*/

app.use(
  "/api/public",
  publicOfferVerificationRoutes
);

/*
|--------------------------------------------------------------------------
| Admin routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/admin",
  adminRoutes
);

/*
|--------------------------------------------------------------------------
| Student routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/student",
  studentRoutes
);

app.use(
  "/api/student",
  studentJobRoutes
);

app.use(
  "/api/student",
  studentApplicationRoutes
);

app.use(
  "/api/student",
  studentInterviewRoutes
);

/*
|--------------------------------------------------------------------------
| Recruiter routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api/recruiter",
  recruiterCompanyProfileRoutes
);

app.use(
  "/api/recruiter",
  recruiterJobRoutes
);

app.use(
  "/api/recruiter",
  recruiterApplicantRoutes
);

app.use(
  "/api/recruiter",
  recruiterInterviewRoutes
);

/*
|--------------------------------------------------------------------------
| Shared authenticated API routes
|--------------------------------------------------------------------------
*/

app.use(
  "/api",
  notificationRoutes
);

app.use(
  "/api",
  offerRoutes
);

/*
|--------------------------------------------------------------------------
| API not-found handler
|--------------------------------------------------------------------------
*/

app.use(
  (
    request,
    response
  ) => {
    return response
      .status(404)
      .json({
        success:
          false,

        message:
          "API route not found",
      });
  }
);

/*
|--------------------------------------------------------------------------
| Error handler
|--------------------------------------------------------------------------
|
| This also gives a clearer response if CORS rejects an origin.
|
*/

app.use(
  (
    error,
    request,
    response,
    next
  ) => {
    console.error(
      "CampusTE server error:",
      error.message
    );

    if (
      error.message
        ?.startsWith(
          "CORS blocked origin:"
        )
    ) {
      return response
        .status(403)
        .json({
          success:
            false,

          message:
            "This frontend origin is not allowed to access the CampusTE backend.",
        });
    }

    return response
      .status(500)
      .json({
        success:
          false,

        message:
          "An unexpected server error occurred.",
      });
  }
);

/*
|--------------------------------------------------------------------------
| Start server
|--------------------------------------------------------------------------
*/

async function startServer() {
  try {
    const databaseStatus =
      await testDatabaseConnection();

    console.log(
      `MySQL connected successfully to database: ${databaseStatus.databaseName}`
    );

    app.listen(
      PORT,
      "0.0.0.0",
      () => {
        console.log(
          `CampusTE backend running locally at http://localhost:${PORT}`
        );

        console.log(
          `CampusTE backend network access enabled on port ${PORT}`
        );

        console.log(
          `CampusTE public frontend URL: ${PUBLIC_APP_URL}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Unable to connect to MySQL:",
      error.message
    );

    process.exit(1);
  }
}

startServer();