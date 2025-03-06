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
            db.all(`
                SELECT 
                    c.email, 
                    r.mileage,
                    car.carModel, 
                    car.carYear, 
                    car.carGrade
                FROM RegistrationNumber r
                JOIN Cars car ON r.carId = car.carId
                JOIN Customers c ON r.customerId = c.customerId
                WHERE c.email = ?;`, [email], (err, cc) => {
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
    }


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