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
    },

    CustomerCars: async (email) => {
        return new Promise((resolve, reject) => {
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

                const carId = 1;

                db.run(queryForRegistrationNumber, [carId, customerId, mileage, guestCarRegisNo], function (err) {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Error inserting into RegistrationNumber' });
                        return;
                    }

                    const regId = this.lastID;

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
                                    reject('Error ja bruh help')
                                }
                            });
                        });

                        resolve({ message: 'Booking created successfully', serviceHistoryId });
                    });
                });
            });
        });
    }
};

module.exports = UserModel;
