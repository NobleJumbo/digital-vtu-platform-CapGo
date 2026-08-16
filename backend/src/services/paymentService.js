const axios = require("axios");

// const initializePayment = async (
//   email,
//   amount
// ) => {
//   const response = await axios.post(
//     "https://api.paystack.co/transaction/initialize",
//     {
//       email,
//       amount: amount * 100,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data;
// };

// const verifyPayment = async (
//   reference
// ) => {
//   const response = await axios.get(
//     `https://api.paystack.co/transaction/verify/${reference}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//       },
//     }
//   );

//   return response.data;
// };

// module.exports = {
//   initializePayment,
//   verifyPayment,
// };
// const axios = require("axios");

const paystack = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: "Bearer YOUR_PAYSTACK_SECRET_KEY",
    "Content-Type": "application/json",
  },
});

module.exports = paystack;