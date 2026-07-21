import mysql from "mysql2/promise";

const requiredEnvironmentVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
];

const missingEnvironmentVariables =
  requiredEnvironmentVariables.filter(
    (variableName) => !process.env[variableName]
  );

if (missingEnvironmentVariables.length > 0) {
  throw new Error(
    `Missing database environment variables: ${missingEnvironmentVariables.join(
      ", "
    )}`
  );
}

const databasePool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function testDatabaseConnection() {
  const connection = await databasePool.getConnection();

  try {
    const [rows] = await connection.query(
      "SELECT DATABASE() AS databaseName, NOW() AS serverTime"
    );

    return rows[0];
  } finally {
    connection.release();
  }
}

export default databasePool;