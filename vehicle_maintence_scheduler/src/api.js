const axios = require("axios");
const { ACCESS_TOKEN } = require("./config");

const BASE_URL = "http://4.224.186.213/evaluation-service";

async function fetchDepots() {
  console.log("TOKEN:", ACCESS_TOKEN);

  const response = await axios.get(
    `${BASE_URL}/depots`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    }
  );

  return response.data.depots;
}

async function fetchVehicles() {
  const response = await axios.get(
    `${BASE_URL}/vehicles`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    }
  );

  return response.data.vehicles;
}

module.exports = {
  fetchDepots,
  fetchVehicles
};
