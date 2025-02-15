const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "10.0.15.21",
    user: "s66070286",
    password: "ZDJG7L8I", 
    database: "d66070286"
});

// เชื่อมต่อ MySQL
conn.connect(error => {
    if (error) throw error;
    console.log("Connected to database.");
});

module.exports = conn;
