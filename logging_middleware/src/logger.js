const axios = require("axios");
const { ACCESS_TOKEN } = require("./config");

const validStacks = ["backend", "frontend"];

const validLevels = [
  "debug",
  "info",
  "warn",
  "error",
  "fatal"
];

async function Log(stack, level, pkg, message) {
  try {
    if (!validStacks.includes(stack)) {
      throw new Error("Invalid stack");
    }

    if (!validLevels.includes(level)) {
      throw new Error("Invalid log level");
    }

    const response = await axios.post(
      "http://4.224.186.213/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data || error.message
    );
  }
}

module.exports = Log;
