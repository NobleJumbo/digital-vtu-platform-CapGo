// const mongoose = require("mongoose");

// const connectDB = async () => {
//     if (mongoose.connection.readyState) return;

//     try {
//         await mongoose.connect(process.env.MONGO_URI);

//         console.log("MongoDB connected");
//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(uri);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;