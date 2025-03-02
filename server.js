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
// * ford everest 2024 wildtrak ==> carId: 3
    // for (let i = 1; i <= 16; i++) {
    //     // * ตะกั่ว
    //     db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
    //         values (?, ?)`, [i, 18], (err, result) => {
    //         if (err) {
    //             console.error(err);
    //             return res.send('Error creating database');
    //         }
    //     });

    //     if (i % 2 === 0) {
    //         db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
    //             values (?, ?)`, [i, 8], (err, result) => {
    //             if (err) {
    //                 console.error(err);
    //                 return res.send('Error creating database');
    //             }
    //         });
    //     }
    //     if (i % 3 === 0) {
    //         db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
    //             values (?, ?), (?, ?)`, [i, 6, i, 7], (err, result) => {
    //             if (err) {
    //                 console.error(err);
    //                 return res.send('Error creating database');
    //             }
    //         });
    //     }
    //     if (i % 5 === 0) {
    //         db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
    //             values (?, ?)`, [i, 5], (err, result) => {
    //             if (err) {
    //                 console.error(err);
    //                 return res.send('Error creating database');
    //             }
    //         });
    //     }
    //     if (i % 10 === 0) {
    //         db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
    //             values (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)
    //             , (?, ?), (?, ?)`, 
    //             [i, 9, i, 10, i, 11, i, 12, i, 13, i, 14, i, 15, i, 16, i, 17], (err, result) => {
    //             if (err) {
    //                 console.error(err);
    //                 return res.send('Error creating database');
    //             }
    //         });
    //     }
    // }


// * ford everest 2024 wildtrak ==> carId: 4
// ! ใช้ไม่ได้ ต้องใช้วิธี count เอา โอ้ย เดี๋ยวมาแก้ตอนเช้า
    let count = 1;

    for (let i = 17; i <= 32; i++) {
        // * ตะกั่ว
        db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
            values (?, ?)`, [i, 18], (err, result) => {
            if (err) {
                console.error(err);
                return res.send('Error creating database');
            }
        });

        if (count % 2 === 0) {
            db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
                values (?, ?)`, [i, 8], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.send('Error creating database');
                }
            });
        }
        if (count % 3 === 0) {
            db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
                values (?, ?), (?, ?)`, [i, 6, i, 7], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.send('Error creating database');
                }
            });
        }
        if (count % 5 === 0) {
            db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
                values (?, ?)`, [i, 5], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.send('Error creating database');
                }
            });
        }
        if (count % 10 === 0) {
            db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
                values (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)
                , (?, ?), (?, ?)`, 
                [i, 9, i, 10, i, 11, i, 12, i, 13, i, 14, i, 15, i, 16, i, 17], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.send('Error creating database');
                }
            });
        }
        count++;
    }
});


app.get("/getMaintenanceGoods", (req, res) => {
    // const { carId, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter
    const { carModel, carYear, carGrade, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter

    // console.log("Received carId:", carId);
    // console.log("Received carId:", carModel);
    // console.log("Received mileage:", mileage);

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

    // const sql = `SELECT g.goodsBrand, g.goodsName, g.goodsPrice
    //             FROM MaintenanceGoods mg
    //             JOIN Goods g ON mg.goodsId = g.goodsId
    //             WHERE mg.maintenanceId IN (
    //                 SELECT m.maintenanceId
    //                 FROM Maintenance m
    //                 JOIN Cars c ON m.carId = c.carId
    //                 WHERE c.carModel = ? AND c.carYear = ? AND m.mileage = ?
    //             );`
    //         ;

    // const sql = `
    //     SELECT DISTINCT g.goodsBrand, g.goodsName, g.goodsPrice
    //     FROM MaintenanceGoods mg
    //     JOIN Goods g ON mg.goodsId = g.goodsId
    //     WHERE mg.maintenanceId IN (
    //         SELECT m.maintenanceId
    //         FROM Maintenance m
    //         JOIN Cars c ON m.carId = c.carId
    //         WHERE c.carModel = ? AND c.carYear = ? AND m.mileage = ?
    //     );`;

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

    // console.log("Constructed SQL query:", sql);

    // db.all(sql, [carModel, carYear, mileage], (err, rows) => {
    //     if (err) {
    //         res.status(500).json({ error: err.message });
    //     } else {
    //         res.json(rows);
    //         console.log('rows: ', JSON.stringify(rows, null, 2));
    //     }
    // });
});


// from lab class
app.listen(port, () => {
    console.log('✅ Server is running on port 3000');
});
