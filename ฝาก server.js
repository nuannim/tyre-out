

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
