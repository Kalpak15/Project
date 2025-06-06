const express = require('express');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const coursesRoute = require("./routes/courses");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();


app.use("/auth", authRoute);
app.use("/student", studentRoute);
app.use("/courses", coursesRoute);


app.get('/', (req, res) => {
    res.send('Hello, this is my  backend!');
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});