const mysql = require('mysql2/promise');

// Create a connection pool (instead of creating a single connection)
const pool = mysql.createPool({
  host: 'mysql-service',  // Kubernetes service name for MySQL (use 'mysql-service')
  user: 'root',  // MySQL user
  password: 'yourpassword',  // Hardcoded password
  database: 'doctorhunt',  // Database name
  waitForConnections: true,  // Wait for a connection to become available if all connections are in use
  connectionLimit: 20,  // Maximum number of connections in the pool
  queueLimit: 0  // No limit on queued connections
});

// Create a function to handle the query execution (similar to the previous `db.connect()` structure)
const connectDb = async () => {
  try {
    // Try to get a connection from the pool
    const connection = await pool.getConnection();
    console.log("Connected to MySQL Database!");
    connection.release();  // Release the connection back to the pool after use
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

// Connect to the database once when the service starts
connectDb();

module.exports = pool;  // Export the connection pool
