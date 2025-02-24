const UserModel = require('../models/UserModel');

// const conn = require('../models/dbconn.js');
// const db = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js

const UserController = {
    getIndexPage: async (req, res) => {

        const email = req.session.user ? req.session.user.email : 'Guest';
        const p = await UserModel.allPromotion();
        const sb = await UserModel.allServiceBranch();

        console.log(p);
        console.log(sb);

        res.render('index', {
                        email: email,
                        promotions: p,
                        servicebranches: sb});

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
        try {
            res.render('appointment');
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
<<<<<<< Updated upstream

    getLoginPage: async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    }
=======
    processSignin: async (req, res) => {
        let formdata = {
            username2: req.body.username,
            password2: req.body.password,
        };

        const p = await UserModel.allPromotion();
        const sb = await UserModel.allServiceBranch();
    
        UserModel.findByEmail(formdata.username2, (err, result) => {
            if (err) {
                console.error(err);
                return res.send("<h1>Server Error</h1><a href='/signin'>Try again</a>");
            }
            
            if (result.length === 0) {
                return res.send("<h1>Cant find</h1><a href='/signin'>Try again</a>");
            } 
            
            const user = result;

            if (!user) {
                return res.send("<h1>Invalid</h1><a href='/signin'>Try again</a>");
            }
    
            if (user.email === formdata.username2 && user.phoneNumber !== formdata.password2) {
                return res.send("<h1>Wrong password</h1><a href='/signin'>Try again</a>");
            } 
            
            
            req.session.user = { email: user.email };

            res.cookie('userSession', user.email, { 
                httpOnly: true, 
                secure: false, 
                sameSite: 'strict', 
                maxAge: 1000 * 60 * 15
            });
    
            // เช็ค role แล้วรีไดเรกต์ไปหน้าที่ถูกต้อง
            // if (user.role === 'admin') {
            //     res.redirect('/admin-dashboard');
            // } else {
            //     res.redirect('/user-dashboard');
            // }
            // res.send(`
            //     <h1>Login success</h1>
            //     <p>Welcome, <b>${user.email}</b>!</p>
            //     <a href="/user-dashboard">Go to Dashboard</a>
            // `);
            res.render('index', { email: user.email,
                        promotions: p,
                        servicebranches: sb
            });
        });
        
    },
    getUserDashboard: async (req, res) => {
        if (!req.session.user) {
            return res.redirect('/signin');
        }
        res.render('user-dashboard', { user: req.session.user });
    },

    logout: async (req, res) => {
        res.clearCookie('userSession');
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/signin');
        });
    },

    getSigninPage: async (req, res) => {
        res.render('signin');
    },
    
>>>>>>> Stashed changes

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