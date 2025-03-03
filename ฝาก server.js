

// app.get('/create', (req, res) => {
//     // * ford everest 2024 wildtrak ==> carId: 3
//         for (let i = 1; i <= 16; i++) {
//             // * ตะกั่ว
//             db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                 values (?, ?)`, [i, 18], (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.send('Error creating database');
//                 }
//             });
    
//             if (i % 2 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?)`, [i, 8], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             if (i % 3 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?), (?, ?)`, [i, 6, i, 7], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             if (i % 5 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?)`, [i, 5], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             if (i % 10 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)
//                     , (?, ?), (?, ?)`, 
//                     [i, 9, i, 10, i, 11, i, 12, i, 13, i, 14, i, 15, i, 16, i, 17], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//         }
    
    
//     // * ford everest 2024 wildtrak ==> carId: 4
//     // ! ใช้ไม่ได้ ต้องใช้วิธี count เอา โอ้ย เดี๋ยวมาแก้ตอนเช้า
//         let count = 1;
    
//         for (let i = 17; i <= 32; i++) {
//             // * ตะกั่ว
//             db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                 values (?, ?)`, [i, 18], (err, result) => {
//                 if (err) {
//                     console.error(err);
//                     return res.send('Error creating database');
//                 }
//             });
    
//             if (count % 2 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?)`, [i, 8], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             if (count % 3 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?), (?, ?)`, [i, 6, i, 7], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             if (count % 5 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?)`, [i, 5], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             if (count % 10 === 0) {
//                 db.run(`insert into MaintenanceGoods (maintenanceId, goodsId)
//                     values (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?), (?, ?)
//                     , (?, ?), (?, ?)`, 
//                     [i, 9, i, 10, i, 11, i, 12, i, 13, i, 14, i, 15, i, 16, i, 17], (err, result) => {
//                     if (err) {
//                         console.error(err);
//                         return res.send('Error creating database');
//                     }
//                 });
//             }
//             count++;
//         }
//     });


// * ย้ายไปใส่ UserRoutes.js & UserController.js
// app.get("/getMaintenanceGoods", (req, res) => {
//     // const { carId, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter
//     const { carModel, carYear, carGrade, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter

//     const sql = `
// SELECT 
//     mg.maintenanceGoodsId,
//     mg.maintenanceId,
//     mg.goodsId,
//     m.carId,
//     m.mileage,
//     c.carModel,
//     c.carYear,
//     c.carGrade,
//     g.goodsBrand,
//     g.goodsName,
//     g.goodsDescription,
//     g.goodsPrice,
//     g.inStock,
//     g.isActive,
//     g.goodsPhotoURL
// FROM 
//     MaintenanceGoods mg
// JOIN 
//     Maintenance m ON mg.maintenanceId = m.maintenanceId
// JOIN 
//     Cars c ON m.carId = c.carId
// JOIN 
//     Goods g ON mg.goodsId = g.goodsId
// WHERE
//     c.carModel = ? AND
//     c.carYear = ? AND
//     c.carGrade = ? AND
//     m.mileage = ?;
// `;
//     db.all(sql, [carModel, carYear, carGrade, mileage], (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//         } else {
//             res.json(rows);
//             console.log('rows: ', JSON.stringify(rows, null, 2));
//         }
//     });

// });
