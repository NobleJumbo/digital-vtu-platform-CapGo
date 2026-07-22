const axios = require("axios");

const CheapData = axios.create({
  baseURL: "https://www.cheapdatahub.ng/api/v1",
  headers: {
    Authorization: "Bearer " + process.env.CHEAPDATAHUB_API_KEY,
    "Content-Type": "application/json",
  },
});

module.exports = CheapData;