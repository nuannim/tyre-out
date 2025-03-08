

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




// app.post('/appointment', (req, res) => {
//     // const bookingData = req.body;
//     const {
//         carModel, carYear, carGrade, mileage, 
//         centerId, caseStartDatetime,
//         slot, caseCategory, 
//         guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
//         goodsIdList
//     } = req.body;

//     let customerId;

//     // const values = [
//     //     carModel, carYear, carGrade, mileage, 
//     //     centerId, caseStartDatetime,
//     //     slot, caseCategory, 
//     //     guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
//     //     goodsIdList
//     // ];

//     // const query = `INSERT INTO bookings 
//     // (carModel, carYear, carGrade, mileage, 
//     // centerId, caseStartDatetime,
//     // slot, caseCategory, 
//     // guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
//     // goodsIdList) 
//     // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const queryForCustomers = `insert into Customers 
//                     (firstName, lastName, phoneNumber, email)
//                     values (?, ?, ?, ?)`;

//     db.run(queryForCustomers, [guestFirstName, guestLastName, guestTel, guestEmail], function (err) {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error creating customer' });
//             return;
//         }
//         customerId = this.lastID;

//         const queryForRegistrationNumber = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) 
//                                             VALUES (?, ?, ?, ?)`;

//         const carId = 1;  // คุณจะต้องกำหนด carId ที่จะใช้ หรือดึงจากข้อมูลที่มีอยู่

//         db.run(queryForRegistrationNumber, [carId, customerId, mileage, guestCarRegisNo], function (err) {
//             if (err) {
//                 console.error(err);
//                 res.status(500).json({ error: 'Error inserting into RegistrationNumber' });
//                 return;
//             }

//             const regId = this.lastID;

//             // * หลังจากที่เพิ่มข้อมูลลงใน RegistrationNumber แล้ว เพิ่มข้อมูลลงใน ServiceHistory
//             const values = [
//                 customerId, caseCategory, slot, caseStartDatetime, centerId, regId, 0, mileage
//             ];

//             const query = `insert into ServiceHistory 
//                 (customerId, caseCategory, slot, caseStartDatetime, centerId, regId, status, caseSummary)
//                 values (?, ?, ?, ?, ?, ?, ?, ?)`;

//             db.run(query, values, function (err) {
//                 if (err) {
//                     console.error(err);
//                     res.status(500).json({ error: 'Error creating service history' });
//                     return;
//                 }

//                 const serviceHistoryId = this.lastID;
//                 const serviceHistoryDetailsValues = goodsIdList.map(goodsId => [serviceHistoryId, goodsId]);
//                 const serviceHistoryDetailsQuery = `INSERT INTO ServiceHistoryDetails (serviceHistoryId, goodsId) VALUES (?, ?)`;

//                 serviceHistoryDetailsValues.forEach(values => {
//                     db.run(serviceHistoryDetailsQuery, values, function (err) {
//                         if (err) {
//                             console.error(err);
//                             res.status(500).json({ error: 'Error creating service history details' });
//                             return;
//                         }
//                     });
//                 });

//                 // แก้ไขให้การตอบกลับเมื่อสร้าง booking สำเร็จเป็น JSON
//                 res.status(201).json({ message: 'Booking created successfully', serviceHistoryId });
//             });
//         });
//     });
// });






// app.get('/getLoggedInUser', (req, res) => {
//     const email = req.query.email;

//     // const query = `
//     //     SELECT Customers.*, RegistrationNumber.carRegisNo 
//     //     FROM Customers 
//     //     LEFT JOIN RegistrationNumber ON Customers.customerId = RegistrationNumber.customerId
//     //     WHERE Customers.email = ?`;

//     const query = `
//         SELECT *
//         FROM Customers 
//         LEFT JOIN RegistrationNumber ON Customers.customerId = RegistrationNumber.customerId
//         WHERE Customers.email = ?`;
    
//     db.all(query, [email], (err, rows) => {
        
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
        
//         if (rows.length === 0) {
//             res.status(404).json({ error: 'User not found' });
//             return;
//         }

//         // ส่งข้อมูลที่ได้จากการ join ทั้งสองตาราง
//         res.json(rows);
//         // res.json(rows[0]);
//     });
// });





// app.post('/appointmentLoggedIn', (req, res) => {
//     const {
//         // carModel, carYear, carGrade, 
//         mileage, 
//         centerId, caseStartDatetime,
//         slot, caseCategory, 
//         // guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
//         goodsIdList, customerId, regId
//     } = req.body;

    
//     const updateMileageQuery = `UPDATE RegistrationNumber SET mileage = ? WHERE customerId = ?`;

//     db.run(updateMileageQuery, [mileage, customerId], function (err) {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error updating mileage' });
//             return;
//         }

//         const values = [
//             customerId, caseCategory, slot, caseStartDatetime, centerId, regId, 0, mileage
//         ];

//         const query = `INSERT INTO ServiceHistory 
//             (customerId, caseCategory, slot, caseStartDatetime, centerId, regId, status, caseSummary)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

//         db.run(query, values, function (err) {
//             if (err) {
//                 console.error(err);
//                 res.status(500).json({ error: 'Error creating service history' });
//                 return;
//             }

//             const serviceHistoryId = this.lastID;
//             const serviceHistoryDetailsValues = goodsIdList.map(goodsId => [serviceHistoryId, goodsId]);
//             const serviceHistoryDetailsQuery = `INSERT INTO ServiceHistoryDetails (serviceHistoryId, goodsId) VALUES (?, ?)`;

//             serviceHistoryDetailsValues.forEach(values => {
//                 db.run(serviceHistoryDetailsQuery, values, function (err) {
//                     if (err) {
//                         console.error(err);
//                         res.status(500).json({ error: 'Error creating service history details' });
//                         return;
//                     }
//                 });
//             });

//             res.status(201).json({ message: 'Booking created successfully', serviceHistoryId });
//         });
//     });
// });


// app.get('/getShowDetail/:serviceHistoryId', (req, res) => {
//     const serviceHistoryId = req.params.serviceHistoryId;

//     const query = ``;

//     db.all(query, [serviceHistoryId], (err, rows) => {
        
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }

//         res.json(rows);
//     });
// });
