const express = require("express");
const cors =require('cors');
const userRoutes = require("./src/route/userRoute.js");

const app=express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);



//test route
app.get('/', (req, res)=>{
res.send('api ruuning');
});

module.exports = app;