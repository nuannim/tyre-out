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
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* routing
require('./routes/UserRoutes.js')(app);
require('./routes/EmployeeRoutes.js')(app);

// ! โค้ดเพิ่ม db ย้ายไปที่ ฝาก server.js


// ! เดี๋ยวจะย้ายไปใส่ routes & controller
app.get("/getMaintenanceGoods", (req, res) => {
    // const { carId, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter
    const { carModel, carYear, carGrade, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter

    const sql = `
SELECT 
    mg.maintenanceGoodsId,
    mg.maintenanceId,
    mg.goodsId,
    m.carId,
    m.mileage,
    c.carModel,
    c.carYear,
    c.carGrade,
    g.goodsBrand,
    g.goodsName,
    g.goodsDescription,
    g.goodsPrice,
    g.inStock,
    g.isActive,
    g.goodsPhotoURL
FROM 
    MaintenanceGoods mg
JOIN 
    Maintenance m ON mg.maintenanceId = m.maintenanceId
JOIN 
    Cars c ON m.carId = c.carId
JOIN 
    Goods g ON mg.goodsId = g.goodsId
WHERE
    c.carModel = ? AND
    c.carYear = ? AND
    c.carGrade = ? AND
    m.mileage = ?;
`;
    db.all(sql, [carModel, carYear, carGrade, mileage], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
            console.log('rows: ', JSON.stringify(rows, null, 2));
        }
    });

});


// from lab class
app.listen(port, () => {
    console.log('✅ Server is running on port 3000');
});
