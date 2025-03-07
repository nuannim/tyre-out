const db = require('./dbconn.js');

const UserModel = {

    selectFromProvince: (province) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ServiceBranch WHERE province = "${province}";`, (err, d) => {
                if (err) reject(err);
                else resolve(d);
            });
        });
    },

    selectDistricts: (province) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT district FROM ServiceBranch WHERE province = "${province}";`, (err, d) => {
                if (err) reject(err);
                else resolve(d);
            });
        });
    },

    showSelectedSalted: (province, district) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ServiceBranch WHERE province = "${province}" AND district = "${district}";`, (err, d) => {
                if (err) reject(err);
                else resolve(d);
            });
        });
    },

    allPromotion: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * from Promotion", (err, p) => {
              if (err) reject(err);
              else resolve(p);
            });
        });

        // * ใช้ไม่ได้ แต่อย่าเพิ่งลบ
        // db.all(`select * from Promotion `, (err, p) => {
        //     if (err) {
        //         console.log("err query Promotion: ", err.message);
        //     }
        //     return p;
        // })

    },

    CarGrades: (model) => {
        return new Promise((resolve, reject) => {
            db.all(`SELECT DISTINCT carGrade from Cars WHERE carModel = "${model}";`, (err, p) => {
              if (err) reject(err);
              else resolve(p);
            });
        });
    },

    allGoods: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * from Goods", (err, p) => {
              if (err) reject(err);
              else resolve(p);
            });
        });
    },

    allServiceBranch: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * from ServiceBranch", (err, sb) => {
              if (err) reject(err);
              else resolve(sb);
            });
        });
        
        // * ใช้ไม่ได้ แต่อย่าเพิ่งลบ
        // return db.all(`select * from ServiceBranch `, (err2, sb) => {
        //     if (err2) {
        //         console.log("err query2 ServiceBranch :", err2.message);
        //     }
        //     // console.log("no err query Promotion: " + p);
        //     return sb;
        // })

    
    },
    
    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT email, phoneNumber FROM Customers WHERE email = ?`;
            db.get(sql, [email], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },
    allCars: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * from Cars", (err, c) => {
              if (err) reject(err);
              else resolve(c);
            });
        });
    }
    // ,
    // CustomerCars: async (email) => {
    //     return new Promise((resolve, reject) => {
    //         db.all("SELECT * from CustomerCars WHERE CusEmail = ?", [email], (err, cc) => {
    //           if (err) reject(err);
    //           else resolve(cc);
    //         });
    //     });
    // }

    ,
    CustomerCars: async (email) => {
        return new Promise((resolve, reject) => {

            // const query = `
            //     SELECT 
            //         c.email, 
            //         r.mileage,
            //         car.carModel, 
            //         car.carYear, 
            //         car.carGrade
            //     FROM RegistrationNumber r
            //     JOIN Cars car ON r.carId = car.carId
            //     JOIN Customers c ON r.customerId = c.customerId
            //     WHERE c.email = ?`;
                
            // * ตรงนี้เนยสดแก้เอง
            const query = `
                SELECT * FROM RegistrationNumber r
                JOIN Cars car ON r.carId = car.carId
                JOIN Customers c ON r.customerId = c.customerId
                WHERE c.email = ?`;
            
            db.all(query, [email], (err, cc) => {
              if (err) reject(err);
              else resolve(cc);
            });
        });
    },
    maintenanceGoods: async (carModel, carYear, carGrade, mileage) => {
        return new Promise((resolve, reject) => {
            db.all(`
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
                `, [carModel, carYear, carGrade, mileage], (err, mg) => {
              if (err) reject(err);
              else resolve(mg);
            });
        });
    },

// * ของเนยสด =========================================================
    allHistory: async (email) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM ServiceHistory sh
                INNER JOIN ServiceBranch sb 
                    ON sh.centerId = sb.centerId
                INNER JOIN RegistrationNumber rn
                    ON sh.regId = rn.regId        
                INNER JOIN Customers c            
                    ON rn.customerId = c.customerId
                INNER JOIN Cars car 
                    ON rn.carId = car.carId
                where c.email = ?;`;
    
            // const values = [req.session.user.email]; 
            // const values = ['max@gmail.com']; 
            const values = [email];
    
            console.log("Before DB Query");

            db.all(query, values, (err, h) => {
                if (err) reject(err);
                else resolve(h);
            });
        });
    },
    createAppointment: async (
        mileage, 
        centerId, caseStartDatetime, 
        slot, caseCategory, 
        guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
        goodsIdList,
        customerId
    ) => {
        return new Promise((resolve, reject) => {
            // const query = ``;
            // const values = [];
    
            // db.all(query, values, (err, data) => {
            //     if (err) reject(err);
            //     else resolve(data);
            // });

            
            const queryForCustomers = `insert into Customers 
            (firstName, lastName, phoneNumber, email)
            values (?, ?, ?, ?)`;

            db.run(queryForCustomers, [guestFirstName, guestLastName, guestTel, guestEmail], function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Error creating customer' });
                    return;
                }
                customerId = this.lastID;

                const queryForRegistrationNumber = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) 
                                                VALUES (?, ?, ?, ?)`;

                const carId = 1;  // คุณจะต้องกำหนด carId ที่จะใช้ หรือดึงจากข้อมูลที่มีอยู่

                db.run(queryForRegistrationNumber, [carId, customerId, mileage, guestCarRegisNo], function (err) {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Error inserting into RegistrationNumber' });
                        return;
                    }

                    const regId = this.lastID;

                    // * หลังจากที่เพิ่มข้อมูลลงใน RegistrationNumber แล้ว เพิ่มข้อมูลลงใน ServiceHistory
                    const values = [
                        customerId, caseCategory, slot, caseStartDatetime, centerId, regId, 0, mileage
                    ];

                    const query = `insert into ServiceHistory 
                        (customerId, caseCategory, slot, caseStartDatetime, centerId, regId, status, caseSummary)
                        values (?, ?, ?, ?, ?, ?, ?, ?)`;

                    db.run(query, values, function (err) {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Error creating service history' });
                            return;
                        }

                        const serviceHistoryId = this.lastID;
                        const serviceHistoryDetailsValues = goodsIdList.map(goodsId => [serviceHistoryId, goodsId]);
                        const serviceHistoryDetailsQuery = `INSERT INTO ServiceHistoryDetails (serviceHistoryId, goodsId) VALUES (?, ?)`;

                        serviceHistoryDetailsValues.forEach(values => {
                            db.run(serviceHistoryDetailsQuery, values, function (err) {
                                if (err) {
                                    console.error(err);
                                    // res.status(500).json({ error: 'Error creating service history details' });
                                    // return;
                                    reject('Error ja bruh help')
                                }
                            });
                        });

                        // res.status(201).json({ message: 'Booking created successfully', serviceHistoryId });
                        resolve({ message: 'Booking created successfully', serviceHistoryId });
                    });
                });
            });
        });
    }
    
    // ,

    // createAppointmentLoggedIn: async (
    //     mileage, 
    //     centerId, caseStartDatetime,
    //     slot, caseCategory, 
    //     goodsIdList, customerId, regId
    // ) => {
    //     return new Promise((resolve, reject) => {
    //         const query = ``;
    //         const values = [];

            
    //     });
    // }


};

module.exports = UserModel;

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// & ตัวอย่าง UserModel ของแชท
// const UserModel = {
//     findAll: () => {
//         return new Promise((resolve, reject) => {
//             db.query("SELECT * FROM customer", (err, results) => {
//                 if (err) reject(err);
//                 else resolve(results);
//             });
//         });
//     },

//     findById: (id) => {
//         return new Promise((resolve, reject) => {
//             db.query("SELECT * FROM customer WHERE id = ?", [id], (err, results) => {
//                 if (err) reject(err);
//                 else resolve(results[0] || null);
//             });
//         });
//     },

//     create: (data) => {
//         return new Promise((resolve, reject) => {
//             db.query(
//                 "INSERT INTO customer (firstname, lastname, centerid, regno, roles) VALUES (?, ?, ?, ?, ?)",
//                 [data.firstname, data.lastname, data.centerid, data.regno, data.roles],
//                 (err, results) => {
//                     if (err) reject(err);
//                     else resolve(results.insertId);
//                 }
//             );
//         });
//     },

//     delete: (id) => {
//         return new Promise((resolve, reject) => {
//             db.query("DELETE FROM customer WHERE id = ?", [id], (err, results) => {
//                 if (err) reject(err);
//                 else resolve(results.affectedRows);
//             });
//         });
//     }
// };