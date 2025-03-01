const UserModel = require('../models/UserModel');

// const conn = require('../models/dbconn.js');
const db = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js

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


        try {
            res.render('appointment',{
                email: email,
                cars: car,
                cuscars: cuscar
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
            password2: req.body.password,
        };
        
        if (formdata.username2 === 'admin' && formdata.password2 === '1234') {
            req.session.user = { email: 'admin', role: 'admin' };

            res.cookie('userSession', 'admin', { 
                httpOnly: true, 
                secure: false, 
                sameSite: 'strict', 
                maxAge: 1000 * 60 * 15
            });

            return res.redirect('/admin');
        }

        UserModel.findByEmail(formdata.username2, async (err, result) => {
            if (err) {
                console.error(err);
                return res.send("<h1>Server Error</h1><a href='/login'>Try again</a>");
            }
            
            const user = result;

            if (!user) {
                return res.send("<h1>Invalid</h1><a href='/login'>Try again</a>");
            }
    
            if (user.email === formdata.username2 && user.phoneNumber !== formdata.password2) {
                return res.send("<h1>Wrong password</h1><a href='/login'>Try again</a>");
            } 
            
            
            

            req.session.user = { email: user.email, role: user.role };

            res.cookie('userSession', user.email, { 
                httpOnly: true, 
                secure: false, 
                sameSite: 'strict', 
                maxAge: 1000 * 60 * 15
            });

            return res.redirect('/');
        });
        
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