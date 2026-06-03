const Log = require("./logger");

async function testLogs() {
  await Log(
    "backend",
    "info",
    "service",
    "Logging middleware initialized successfully"
  );

  await Log(
    "backend",
    "warn",
    "handler",
    "Missing email field in request"
  );

  await Log(
    "backend",
    "error",
    "db",
    "Database connection failed"
  );
}

testLogs();
