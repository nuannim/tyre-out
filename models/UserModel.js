const db = require('./dbconn.js');

const UserModel = {
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

    allServiceBranch: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * from ServiceBranch", (err, sb) => {
              if (err) reject(err);
              else resolve(sb);
            });
        });
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
    }


        // * ใช้ไม่ได้ แต่อย่าเพิ่งลบ
        // return db.all(`select * from ServiceBranch `, (err2, sb) => {
        //     if (err2) {
        //         console.log("err query2 ServiceBranch :", err2.message);
        //     }
        //     // console.log("no err query Promotion: " + p);
        //     return sb;
        // })

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