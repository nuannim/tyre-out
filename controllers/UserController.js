const UserModel = require('../models/UserModel');
const EmployeeModel = require('../models/EmployeeModel');
const crypto = require('crypto');


// const conn = require('../models/dbconn.js');
const db = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js
const { get } = require('http');

const UserController = {
// * START ของเนยสด 1 ==================================================================================
    getIndexPage: async (req, res) => { // * ของเนยสด

        const email = req.session.user ? req.session.user.email : 'Guest';
        const p = await UserModel.allPromotion();
        const sb = await UserModel.allServiceBranch();
        const car = await UserModel.allCars();
        
        const g = await UserModel.allGoods();
            
        const cuscar = await UserModel.CustomerCars(email);


        console.log(p);
        console.log(sb);
        

        res.render('index', {
                        email: email,
                        promotions: p,
                        servicebranches: sb,
                        cars: car,
                        cuscars: cuscar,
                        goods: g
        });

        // res.render('index', {
        //     email: email,
        //     promotions: p,
        //     servicebranches: sb,
        // cars: car});

        // * ของเก่า (ย้ายไปที่ UserModel.js)
        // db.all(`select * from Promotion `, (err, p) => {
        //     if (err) {
        //         console.log("err query Promotion: ", err.message);
        //     }
        //         db.all(`select * from ServiceBranch `, (err2, sb) => {
        //             if (err2) {
        //                 console.log("err query2 ServiceBranch :", err2.message);
        //             }
        //             console.log("no err query Promotion: " + p);
        //             res.render('index', {
        //                 promotions: p,
        //                 servicebranches: sb});
        //         })
        // })

        // * ไว้ดูเป็นตัวอย่าง
        // db.serialize(() => {
        //     // ตัวอย่าง Query หลายตารางแบบต่อเนื่อง
        //     db.all("SELECT * FROM Promotion", (err, promotions) => {
        //       if (err) throw err;
              
        //       db.all("SELECT * FROM Users", (err, users) => {
        //         if (err) throw err;
                
        //         res.render('index', { promotions, users });
        //       });
        //     });
        //   });
    },

    getAppointmentPage: async (req, res) => { // * ของใครไม่รู้
        // ^ อธิบาย: จาก URL /appointment จากหน้า index.ejs - function gotoapp2()
        const {carRegisNo} = req.query; 


        console.log('===== getAppointmentPage in UserController.js =====');
        console.log('carRegisNo: ', carRegisNo); // ^ ข้อมูลไปออกที่ terminal

        const email = req.session.user ? req.session.user.email : 'Guest';
        const car = await UserModel.allCars();
        const cuscar = await UserModel.CustomerCars(email);
        const sb = await UserModel.allServiceBranch();


        try {
            res.render('appointment',{
                email: email,
                cars: car,
                cuscars: cuscar,
                servicebranches: sb,
                carRegisNo
            });
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },

    getHistoryPage: async (req, res) => { // * ของใครไม่รู้ แต่เนยสดแก้ข้างในนะ

        if (!req.session.user) {
            return res.redirect("/login"); // ถ้าไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
        }

        try {
            // // const query = `SELECT * FROM ServiceHistory sh
            // //     INNER JOIN Customers c
            // //     ON sh.customerId = c.customerId
            // //     where c.email = ?`;

            // // const query = `SELECT * FROM ServiceHistory sh
            // //     INNER JOIN ServiceBranch sb
            // //     ON sh.centerId = sb.centerId
            // //     INNER JOIN Customers c
            // //     ON sh.customerId = c.customerId
            // //     INNER JOIN RegistrationNumber rn
            // //     ON c.customerId = rn.customerId
            // //     INNER JOIN Cars car
            // //     ON rn.carId = car.carId
            // //     WHERE c.email = ?;`;

            // const query = `SELECT * 
            //     FROM ServiceHistory sh
            //     INNER JOIN ServiceBranch sb 
            //         ON sh.centerId = sb.centerId
            //     INNER JOIN RegistrationNumber rn
            //         ON sh.regId = rn.regId        
            //     INNER JOIN Customers c            
            //         ON rn.customerId = c.customerId
            //     INNER JOIN Cars car 
            //         ON rn.carId = car.carId
            //     where c.email = ?;`;

            // const values = [req.session.user.email]; 
            // // const values = ['max@gmail.com']; 

            // console.log("Before DB Query");
            
            // db.all(query, values, (err, rows) => {
            //     if (err) {
            //         console.error(err);
            //         return res.status(500).send('Error fetching users');
            //     }
            //     console.log('rows from getHistoryPage: ', rows);
            //     res.render('history', {data: rows});
            // });

            // * ใหม่ ----------------------------------------
            const email = req.session.user.email;

            const h = await UserModel.allHistory(email);
            res.render('history', {data: h});
            console.log('h: ' + h)
            // * ใหม่ ----------------------------------------

        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },
// * END ของเนยสด 1 ==================================================================================

// * START ของแม้ก ==================================================================================
    processSignin: async (req, res) => {
        let formdata = {
            username2: req.body.username,
            password2: req.body.password
        };

        console.log(formdata);

        if (!formdata.username2 || !formdata.password2) {
            return res.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบ" });
        }
        
        
        
        try {

            const [employee, customer] = await Promise.all([
                EmployeeModel.findByEmployeeAccountId(formdata.username2),
                UserModel.findByEmail(formdata.username2)
            ]);
    

            if (employee) {
                const hashedInputPassword = crypto.createHash('sha256').update(formdata.password2).digest('hex');
                if (employee.password !== hashedInputPassword) {
                    return res.json({ success: false, message: "รหัสผ่านผิด" });
                }
    
                req.session.user = { employeeAccountId: employee.employeeAccountId, role: 'admin' };
    
                res.cookie('userSession', employee.employeeAccountId, { 
                    httpOnly: true, 
                    secure: false, 
                    sameSite: 'strict', 
                    maxAge: 1000 * 60 * 15
                });
    
                return res.json({ success: true, redirect: '/admin' });
            }
    

            if (customer) {
                if (customer.phoneNumber !== formdata.password2) {
                    console.log(customer.phoneNumber);
                    return res.json({ success: false, message: "รหัสผ่านผิด" });
                }


                req.session.user = { email: customer.email, role: 'customer' };
    
                res.cookie('userSession', customer.email, { 
                    httpOnly: true, 
                    secure: false, 
                    sameSite: 'strict', 
                    maxAge: 1000 * 60 * 15
                });
    
                return res.json({ success: true, redirect: '/' });
            }

            return res.json({ success: false, message: "ไม่พบบัญชี" });
    
        } catch (err) {
            console.error(err);
            return res.json({ success: false, message: "Server Error" });
        }
        
    },
    logout: async (req, res) => {
        res.clearCookie('userSession');
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/');
        });
    },


    getLoginPage: async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    }
    ,
    CarsaveCustomer: async (req, res) => {
        const { sel1, sel2, sel3, sel4, carRegis, email } = req.body;

        console.log(req.body);

            if (!sel1 || !sel2 || !sel3 || !sel4 || !email || !carRegis) {
                return res.status(400).send('ทะลึ่ง');
            }

        const findcar = `SELECT carId FROM Cars WHERE carModel = ? AND carYear = ? AND carGrade = ?`;

        db.get(findcar, [sel1, sel2, sel3], (err, carRow) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Car find error');
            }

            if (!carRow) {
                return res.status(404).send('Car not found');
            }

            const carId = carRow.carId;

            const findcus = `SELECT customerId FROM Customers WHERE email = ?`;

            db.get(findcus, [email], (err, customerRow) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Cant find customer');
                }

                if (!customerRow) {
                    return res.status(404).send('NOt found');
                }

                const customerId = customerRow.customerId;

                const forinsert = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) 
                VALUES (?, ?, ?, ?)`;

                db.run(forinsert, [carId, customerId, sel4, carRegis], function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('save error');
                    }
                    console.log(`ID: ${this.lastID}`);
                    res.redirect('/');
                });
            });
        });
    }
// * END ของแม้ก ==================================================================================
    ,
// * START ของเนยสด 2 ==================================================================================
    getMaintenanceGoods: async (req, res) => { 
        try {
            const { carModel, carYear, carGrade, mileage } = req.query;

            const mg = await UserModel.maintenanceGoods(carModel, carYear, carGrade, mileage);

            console.log('rows: ', JSON.stringify(mg, null, 2));
            res.json(mg);
    
        } catch (err) {
            res.status(500).json({ 
                error: err.message 
            });
        }

        // * ของเก่า (ย้ายไปที่ UserModel.js)
        // const { carModel, carYear, carGrade, mileage } = req.query; // รับค่า carId และ mileage จาก query parameter

        // const sql = `
        //             SELECT 
        //                 mg.maintenanceGoodsId,
        //                 mg.maintenanceId,
        //                 mg.goodsId,
        //                 m.carId,
        //                 m.mileage,
        //                 c.carModel,
        //                 c.carYear,
        //                 c.carGrade,
        //                 g.goodsBrand,
        //                 g.goodsName,
        //                 g.goodsDescription,
        //                 g.goodsPrice,
        //                 g.inStock,
        //                 g.isActive,
        //                 g.goodsPhotoURL
        //             FROM 
        //                 MaintenanceGoods mg
        //             JOIN 
        //                 Maintenance m ON mg.maintenanceId = m.maintenanceId
        //             JOIN 
        //                 Cars c ON m.carId = c.carId
        //             JOIN 
        //                 Goods g ON mg.goodsId = g.goodsId
        //             WHERE
        //                 c.carModel = ? AND
        //                 c.carYear = ? AND
        //                 c.carGrade = ? AND
        //                 m.mileage = ?;
        //             `;

        // db.all(sql, [carModel, carYear, carGrade, mileage], (err, rows) => {
        //     if (err) {
        //         res.status(500).json({ error: err.message });
        //     } else {
        //         res.json(rows);
        //         console.log('rows: ', JSON.stringify(rows, null, 2));
        //     }
        // });
    }

    ,
    createAppointment: async (req, res) => {
        try {
            // const { carModel, carYear, carGrade, mileage } = req.query;
            const {
                carModel, carYear, carGrade, mileage, 
                centerId, caseStartDatetime,
                slot, caseCategory, 
                guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
                goodsIdList
            } = req.body;

            let customerId;

            const data = await UserModel.createAppointment(
                mileage, 
                centerId, caseStartDatetime, 
                slot, caseCategory, 
                guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
                goodsIdList,
                customerId);

            console.log('rows: ', JSON.stringify(data, null, 2));
            // res.json(data);
            res.status(201).json(data);

    
        } catch (err) {
            res.status(500).json({ 
                error: err.message 
            });
        }

        // const queryForCustomers = `insert into Customers 
        //                 (firstName, lastName, phoneNumber, email)
        //                 values (?, ?, ?, ?)`;
    
        // db.run(queryForCustomers, [guestFirstName, guestLastName, guestTel, guestEmail], function (err) {
        //     if (err) {
        //         console.error(err);
        //         res.status(500).json({ error: 'Error creating customer' });
        //         return;
        //     }
        //     customerId = this.lastID;
    
        //     const queryForRegistrationNumber = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) 
        //                                         VALUES (?, ?, ?, ?)`;
    
        //     const carId = 1;  // คุณจะต้องกำหนด carId ที่จะใช้ หรือดึงจากข้อมูลที่มีอยู่
    
        //     db.run(queryForRegistrationNumber, [carId, customerId, mileage, guestCarRegisNo], function (err) {
        //         if (err) {
        //             console.error(err);
        //             res.status(500).json({ error: 'Error inserting into RegistrationNumber' });
        //             return;
        //         }
    
        //         const regId = this.lastID;
    
        //         // * หลังจากที่เพิ่มข้อมูลลงใน RegistrationNumber แล้ว เพิ่มข้อมูลลงใน ServiceHistory
        //         const values = [
        //             customerId, caseCategory, slot, caseStartDatetime, centerId, regId, 0, mileage
        //         ];
    
        //         const query = `insert into ServiceHistory 
        //             (customerId, caseCategory, slot, caseStartDatetime, centerId, regId, status, caseSummary)
        //             values (?, ?, ?, ?, ?, ?, ?, ?)`;
    
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
    },
    

    // * อันนี้ย้ายมาจาก server.js แบบไม่ได้แก้อะไรเลย
    // createAppointmentLoggedIn: async (req, res) => {
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
    // }

    // * อันนี้เจอว่าเพิ่มข้อมูลไม่ครบสักที เลยไม่รู้เป็ฯอะไร
    // createAppointmentLoggedIn: async (req, res) => {
    //     const {
    //         carId, carRegisNo, mileage, 
    //         centerId, caseStartDatetime,
    //         slot, caseCategory, 
    //         goodsIdList, customerId
    //     } = req.body;
    
    //     try {
    //         // Check if the car already exists in RegistrationNumber
    //         const checkCarQuery = `SELECT regId FROM RegistrationNumber WHERE carId = ? AND customerId = ?`;
    //         db.get(checkCarQuery, [carId, customerId], function (err, row) {
    //             if (err) {
    //                 console.error(err);
    //                 res.status(500).json({ error: 'Error checking car' });
    //                 return;
    //             }
    
    //             let regId;
    //             if (row) {
    //                 // Car exists, update mileage
    //                 regId = row.regId;
    //                 const updateMileageQuery = `UPDATE RegistrationNumber SET mileage = ? WHERE regId = ?`;
    //                 db.run(updateMileageQuery, [mileage, regId], function (err) {
    //                     if (err) {
    //                         console.error(err);
    //                         res.status(500).json({ error: 'Error updating mileage' });
    //                         return;
    //                     }
    //                     createServiceHistory(regId);
    //                 });
    //             } else {
    //                 // Car does not exist, insert new car
    //                 const insertCarQuery = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) VALUES (?, ?, ?, ?)`;
    //                 db.run(insertCarQuery, [carId, customerId, mileage, carRegisNo], function (err) {
    //                     if (err) {
    //                         console.error(err);
    //                         res.status(500).json({ error: 'Error inserting new car' });
    //                         return;
    //                     }
    //                     regId = this.lastID;
    //                     createServiceHistory(regId);
    //                 });
    //             }
    
    //             function createServiceHistory(regId) {
    //                 const values = [
    //                     customerId, caseCategory, slot, caseStartDatetime, centerId, regId, 0, mileage
    //                 ];
    
    //                 const query = `INSERT INTO ServiceHistory 
    //                     (customerId, caseCategory, slot, caseStartDatetime, centerId, regId, status, caseSummary)
    //                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    //                 db.run(query, values, function (err) {
    //                     if (err) {
    //                         console.error(err);
    //                         res.status(500).json({ error: 'Error creating service history' });
    //                         return;
    //                     }
    
    //                     const serviceHistoryId = this.lastID;
    //                     const serviceHistoryDetailsValues = goodsIdList.map(goodsId => [serviceHistoryId, goodsId]);
    //                     const serviceHistoryDetailsQuery = `INSERT INTO ServiceHistoryDetails (serviceHistoryId, goodsId) VALUES (?, ?)`;
    
    //                     serviceHistoryDetailsValues.forEach(values => {
    //                         db.run(serviceHistoryDetailsQuery, values, function (err) {
    //                             if (err) {
    //                                 console.error(err);
    //                                 res.status(500).json({ error: 'Error creating service history details' });
    //                                 return;
    //                             }
    //                         });
    //                     });
    
    //                     res.status(201).json({ message: 'Booking created successfully', serviceHistoryId });
    //                 });
    //             }
    //         });
    //     } catch (err) {
    //         res.status(500).json({ error: err.message });
    //     }
    // }
    // ,
    getLoggedInUser: async (req, res) => { // * app.get('/getLoggedInUser')
        const email = req.query.email;

        const query = `
            SELECT *
            FROM Customers 
            LEFT JOIN RegistrationNumber ON Customers.customerId = RegistrationNumber.customerId
            WHERE Customers.email = ?`;
        
        db.all(query, [email], (err, rows) => {
            
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            if (rows.length === 0) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
    
            // ส่งข้อมูลที่ได้จากการ join ทั้งสองตาราง
            res.json(rows);
            // res.json(rows[0]);
        });
    }
// * END ของเนยสด 2 ===============================================================




    , // * แบคครั้งแรกของแคร์ ฮณี่ๆๆีๆ่ๆรีๆรีๆร่ๆรๆ่
    // เก่งมากน้องงงง
    getDistricts: async (req, res) => {
        const { province } = req.query;

        const district = await UserModel.selectDistricts(province);

        res.send(JSON.stringify(district));
    },

    getSelectedProvinceAndDistrict: async (req, res) => {
        const { province, district } = req.query;

        const result = await UserModel.showSelectedSalted(province, district);
        res.send(JSON.stringify(result));
    },

    getSelectFromProvince: async (req, res) => {
        const { province } = req.query;

        const result = await UserModel.selectFromProvince(province);

        res.send(JSON.stringify(result));
    },

    getGoods: async (req, res) => {
        const g = await UserModel.allGoods();
        const email = req.session.user ? req.session.user.email : 'Guest';
        res.render('goods', {
            goods: g,
            email: email
        });
    },

    getCarGrade: async (req, res) => {
        const { c } = req.query;

        const result = await UserModel.CarGrades(c);

        res.send(JSON.stringify(result));
    }


};

module.exports = UserController;

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// & ตัวอย่าง UserController ของแชท
// const UserController = {
    // getBookingPage: async (req, res) => {
    //     try {
    //         const users = await UserModel.findAll();
    //         res.render('booking', { users });
    //     } catch (error) {
    //         res.status(500).send('Error fetching users');
    //     }
    // },

    // getUserDetails: async (req, res) => {
    //     try {
    //         const user = await UserModel.findById(req.params.id);
    //         if (user) {
    //             res.json(user);
    //         } else {
    //             res.status(404).send('User not found');
    //         }
    //     } catch (error) {
    //         res.status(500).send('Error fetching user');
    //     }
    // },

    // createUser: async (req, res) => {
    //     try {
    //         const newUserId = await UserModel.create(req.body);
    //         res.status(201).send(`User created with ID: ${newUserId}`);
    //     } catch (error) {
    //         res.status(500).send('Error creating user');
    //     }
    // },

    // deleteUser: async (req, res) => {
    //     try {
    //         const deletedRows = await UserModel.delete(req.params.id);
    //         if (deletedRows > 0) {
    //             res.send('User deleted');
    //         } else {
    //             res.status(404).send('User not found');
    //         }
    //     } catch (error) {
    //         res.status(500).send('Error deleting user');
    //     }
    // }

// };