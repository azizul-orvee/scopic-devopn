const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const Redis = require("ioredis");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Redis connection
// const redis = new Redis({
//   host: 'my-elasticache-cluster.txq7i7.0001.use1.cache.amazonaws.com',
//   port: 6379
// });

// example of setting a value
// redis.set('foo', 'bar');

// example of getting a value
// redis.get('foo', function (err, result) {
//   console.log(result);
// });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database...");
});

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20)
  )
`;

db.query(createUsersTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("Users table checked/created successfully.");
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Success, build done!! Focus on Doc, Finish early my man!</h1>");
});

// Add a new route to fetch all users
app.get("/users", (req, res) => {
  const getUsersQuery = "SELECT * FROM users";
  db.query(getUsersQuery, (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Error fetching users" });
    } else {
      res.status(200).json(result);
    }
  });
});

// API Endpoint to save user information to the database
app.post("/addUser", (req, res) => {
  const { username, userphone } = req.body;
  const sql = "INSERT INTO users (username, phone_number) VALUES (?, ?)";
  db.query(sql, [username, userphone], (err, result) => {
    if (err) {
      console.error("Error saving user:", err);
      res.status(500).json({ message: "Error saving user." });
    } else {
      console.log("User saved successfully:", result);
      res.json({ message: "User saved successfully." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
