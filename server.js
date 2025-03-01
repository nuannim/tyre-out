// from lab class
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');

app.use(session({
    secret: 'minimax321',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 }
}));

const db = require('./models/dbconn.js');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// & from P'Chat 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* routing
require('./routes/UserRoutes.js')(app);
require('./routes/EmployeeRoutes.js')(app);

// ! ชั่วคราว ใช้เพิ่ม database
app.get('/create', (req, res) => {
    for (let i = 0; i < 16; i++) {
        // ตะกั่ว
        db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
            values (?, ?)`, [i, 18], (err, result) => {
            if (err) {
                console.error(err);
                return res.send('Error creating database');
            }
        });

        // if (i % 2 === 0) {
            
        // }
        // db.run(`insert into`, (err, result) => {
        //     if (err) {
        //         console.error(err);
        //         return res.send('Error creating database');
        //     }
        //     res.send('Database created');
        // });
    }
    
});


app.get("/getMaintenanceGoods", (req, res) => {
    // const { carId, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter
    const { carModel, carYear, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter

    // console.log("Received carId:", carId);
    console.log("Received carId:", carModel);
    console.log("Received mileage:", mileage);

    // const sql = `
    //     SELECT g.goodsBrand, g.goodsName, g.goodsPrice 
    //     FROM MaintenanceGoods mg
    //     JOIN Maintenance m ON mg.maintenanceId = m.maintenanceId
    //     JOIN Goods g ON mg.goodsId = g.goodsId
    //     WHERE m.carId = ? AND m.mileage = ?;
    // `;

    // const sql = `
    //     SELECT g.goodsBrand, g.goodsName, g.goodsPrice
    //     FROM Goods g
    //     JOIN MaintenanceGoods mg ON g.goodsId = mg.goodsId
    //     JOIN Maintenance m ON mg.maintenanceId = m.maintenanceId
    //     WHERE m.carId = ? AND m.mileage = ?;
    // `;

    const sql = `SELECT g.goodsBrand, g.goodsName, g.goodsPrice
                FROM MaintenanceGoods mg
                JOIN Goods g ON mg.goodsId = g.goodsId
                WHERE mg.maintenanceId IN (
                    SELECT m.maintenanceId
                    FROM Maintenance m
                    JOIN Cars c ON m.carId = c.carId
                    WHERE c.carModel = ? AND c.carYear = ? AND m.mileage = ?
                );`
            ;
    // db.all(sql, [carId, mileage], (err, rows) => {
    db.all(sql, [carModel, carYear, mileage], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});


// from lab class
app.listen(port, () => {
    console.log('✅ Server is running on port 3000');
});
