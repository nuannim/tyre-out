const UserModel = require('../models/UserModel');
// const conn = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js
const db = require('../models/dbconn.js'); // ! เดี๋ยวย้ายไป UserModel.js

const UserController = {
    getIndexPage: async (req, res) => {
        // try {
        //     let sql = `select * from users; `;
        //     console.log("sql: " + sql)
        //     conn.query(sql, function(err, results, fields) {
        //         if (err) throw err;
        //         console.log("result: " + results)
        //         res.render('index', { data: results });
        //         res.end();
        //     })
        // } catch (error) {
        //     res.status(500).send('Error fetching users');
        // }

        const query = `select * from Promotion `;
        db.all(query, (err, rows) => {
            if (err) {
                console.log(err.message);
            }
            console.log(rows);
            res.render('index', {data: rows});
        })
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