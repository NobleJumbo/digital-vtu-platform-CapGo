const mongoose = require("mongoose");

const connectDB = async () => {
    if (mongoose.connection.readyState) return;

    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;