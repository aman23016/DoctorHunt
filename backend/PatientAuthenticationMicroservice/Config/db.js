const mysql = require("mysql2");

// Create a connection to the database with promise support
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword", // Replace with your MySQL password
    database: "doctorhunt"
});

// Use promise() for promise-based queries
db.promise();

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

module.exports = db; // Export the connection
