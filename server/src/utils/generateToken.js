import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is missing from the environment variables."
  );
}

if (JWT_SECRET.length < 32) {
  throw new Error(
    "JWT_SECRET must contain at least 32 characters."
  );
}

export function generateAccessToken({
  userId,
  databaseRole,
}) {
  return jwt.sign(
    {
      role: databaseRole,
    },
    JWT_SECRET,
    {
      subject: String(userId),
      expiresIn:
        process.env.JWT_EXPIRES_IN || "1h",
      issuer:
        process.env.JWT_ISSUER || "campuste-api",
      audience:
        process.env.JWT_AUDIENCE || "campuste-web",
    }
  );
}