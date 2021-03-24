require('dotenv').config({path: "./.env"});
const connectDB = require('./config/db');

//Connect DB
connectDB();
// console.log(process.env.MONGO_URI)