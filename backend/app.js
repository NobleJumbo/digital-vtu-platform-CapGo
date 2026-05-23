const express = require("express");
const cors =require('cors');

const app=express();

//middleware
app.use(express.json());
app.use(cors());

//test route
app.get('/', (req, res)=>{
res.send('api ruuning');
});

module.exports = app;