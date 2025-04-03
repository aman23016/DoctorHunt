const mysql = require("mysql2");

// Create a connection to the database with promise support
const db = mysql.createConnection({
    host: "db", // Use the service name from docker-compose (it refers to the MySQL container)
    user: "root",
    password: "yourpassword", // Make sure to set this in docker-compose.yml
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
