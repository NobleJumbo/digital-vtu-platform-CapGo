const axios = require("axios");

// Check if env variables are loaded
console.log("VTpass Configuration:");
console.log("API URL:", process.env.VTPASS_API_URL);
console.log("API KEY:", process.env.VTPASS_API_KEY);
console.log("PUBLIC KEY:", process.env.VTPASS_PUBLIC_KEY);

const vtpass = axios.create({
  baseURL: process.env.VTPASS_API_URL,
  headers: {
    "api-key": process.env.VTPASS_API_KEY,
    "public-key": process.env.VTPASS_PUBLIC_KEY,
    "Content-Type": "application/json",
  },
});

module.exports = vtpass;