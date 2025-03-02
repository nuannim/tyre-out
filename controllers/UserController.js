const UserModel = require('../models/UserModel');
const EmployeeModel = require('../models/EmployeeModel');
const crypto = require('crypto');


// const conn = require('../models/dbconn.js');
const db = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js
const { get } = require('http');

const UserController = {
    getIndexPage: async (req, res) => {

        const email = req.session.user ? req.session.user.email : 'Guest';
        const p = await UserModel.allPromotion();
        const sb = await UserModel.allServiceBranch();
        const car = await UserModel.allCars();

        
            
        const cuscar = await UserModel.CustomerCars(email);


        console.log(p);
        console.log(sb);
        

        res.render('index', {
                        email: email,
                        promotions: p,
                        servicebranches: sb,
                    cars: car,
                cuscars: cuscar});

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

    getAppointmentPage: async (req, res) => {
        const email = req.session.user ? req.session.user.email : 'Guest';
        const car = await UserModel.allCars();
        const cuscar = await UserModel.CustomerCars(email);
        const sb = await UserModel.allServiceBranch();


        try {
            res.render('appointment',{
                email: email,
                cars: car,
                cuscars: cuscar,
                servicebranches: sb
            });
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },

    getHistoryPage: async (req, res) => {
        try {
            res.render('history');
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },
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
        const { sel1, sel2, sel3, sel4, email } = req.body;

         console.log(req.body);

            if (!sel1 || !sel2 || !sel3 || !sel4 || !email) {
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

            const forinsert = `INSERT INTO RegistrationNumber (carId, customerId, mileage) VALUES (?, ?, ?)`;

            db.run(forinsert, [carId, customerId, sel4], function (err) {
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
    ,
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