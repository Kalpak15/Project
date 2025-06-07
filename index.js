const express = require('express');


const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const coursesRoute = require("./routes/courses");
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const fs = require('fs')
const path = require('path');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());

// Create a write stream for logging to a file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs', 'access.log'),
  { flags: 'a' }
);

// Ensure the logs directory exists
fs.mkdirSync(path.join(__dirname, 'logs'), { recursive: true });

// Use morgan to log HTTP requests to the console and a file
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
app.use('/auth', limiter);

const dbConnect = require("./config/database");
dbConnect();


app.use("/auth", authRoute);
app.use("/student", studentRoute);
app.use("/courses", coursesRoute);

app.use((err, req, res, next) => {
  console.error(`Server Error: ${err.message}\nStack: ${err.stack}`);
  res.status(500).json({ message: 'Server Error' });
});


app.get('/', (req, res) => {
    res.send('Hello, this is my  backend!');
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});