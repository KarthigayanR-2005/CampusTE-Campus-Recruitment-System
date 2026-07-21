import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is missing from the environment variables."
  );
}

export function authenticate(request, response, next) {
  try {
    const authorizationHeader =
      request.headers.authorization;

    if (!authorizationHeader) {
      return response.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const [tokenType, token] =
      authorizationHeader.split(" ");

    if (
      tokenType !== "Bearer" ||
      !token
    ) {
      return response.status(401).json({
        success: false,
        message:
          "Authorization header must use the Bearer token format.",
      });
    }

    const decodedToken = jwt.verify(
      token,
      JWT_SECRET,
      {
        algorithms: ["HS256"],
        issuer:
          process.env.JWT_ISSUER ||
          "campuste-api",
        audience:
          process.env.JWT_AUDIENCE ||
          "campuste-web",
      }
    );

    request.auth = {
      userId: Number(decodedToken.sub),
      databaseRole: decodedToken.role,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        success: false,
        message:
          "Your login session has expired. Please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    console.error(
      "Authentication middleware error:",
      error
    );

    return response.status(500).json({
      success: false,
      message:
        "Unable to verify authentication.",
    });
  }
}