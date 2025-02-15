const mysql = require('mysql');

const dbConfig = {
    host: "ihost.it.kmitl.ac.th",
    user: "it66070286_user",
    password: "123456789",
    database: "it66070286_fwp",
    port: 2222
};

let conn;

// * เป็นไรไม่รู้ ชอบหลุด (code: 'PROTOCOL_CONNECTION_LOST') แชทให้ใช้อันนี้ช่วย
function handleDisconnect() {
    conn = mysql.createConnection(dbConfig);

    conn.connect(error => {
        if (error) {
            console.error("❌ MySQL connection error:", error);
            setTimeout(handleDisconnect, 2000); // ลองใหม่หลังจาก 2 วินาที
        } else {
            console.log("✅ Connected to MySQL");
        }
    });

    conn.on("error", error => {
        console.error("⚠️ MySQL Error:", error);
        if (error.code === "PROTOCOL_CONNECTION_LOST" || error.code === "ECONNRESET") {
            console.log("🔄 Reconnecting to MySQL...");
            handleDisconnect();
        } else {
            throw error;
        }
    });
}

// เริ่มต้นการเชื่อมต่อ
handleDisconnect();

module.exports = conn;

// * ของเก่า
// const mysql = require('mysql');

// // const conn = mysql.createConnection({
// //     host: "10.0.15.21",
// //     user: "s66070286",
// //     password: "ZDJG7L8I", 
// //     database: "d66070286"
// // });

// const conn = mysql.createConnection({
//     host: "ihost.it.kmitl.ac.th",
//     // host: "localhost",
//     user: "it66070286_user",
//     password: "123456789", 
//     database: "it66070286_fwp",
//     port: 2222
// });

// // เชื่อมต่อ MySQL
// conn.connect(error => {
//     if (error) throw error;
//     console.log("Connected to database.");
// });

// module.exports = conn;