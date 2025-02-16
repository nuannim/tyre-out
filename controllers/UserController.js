const UserModel = require('../models/UserModel');
// const conn = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js
const db = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js

// require('dbQuery');

const UserController = {
    getIndexPage: async (req, res) => {
        const query = `select * from Promotion `; // ! เดี๋ยวย้ายไป UserModel.js
        db.all(query, (err, p) => {
            if (err) {
                console.log("err query Promotion: " + err.message);
            }
            const query2 = `select * from ServiceBranch `;
                db.all(query2, (err2, sb) => {
                    if (err2) {
                        console.log("err query2 ServiceBranch :"+ err2.message);
                    }
                    console.log("no err query Promotion: " + p);
                    res.render('index', {
                        promotions: p,
                        servicebranches: sb});
                })
        })

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
    }

};

module.exports = UserController;

//* ตัวอย่าง UserController.js ของแชท
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