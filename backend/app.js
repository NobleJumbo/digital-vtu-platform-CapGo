const express = require("express");
const cors =require('cors');
const userRoutes = require("./src/route/authRoute.js");
const profileRoutes = require("./src/route/profileRoute.js");
const transactionRoutes = require("./src/route/transactionRoute.js");
const cookieParser = require("cookie-parser");
const walletRoutes = require("./src/route/walletRoutes.js");
const paymentRoutes = require("./src/route/paymentRoute.js");
const vtuRoutes = require("./src/route/vtuRoute.js");
const virtualAccountRoutes = require("./src/route/virtualRoute.js");



const app=express();

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/wallet", walletRoutes);
app.use( "/api/payment", paymentRoutes);
app.use("/api/vtu", vtuRoutes);
app.use("/api/virtual-account",virtualAccountRoutes);  



//test route
app.get('/', (req, res)=>{
res.send('api ruuning');
});

module.exports = app;