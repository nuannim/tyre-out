const UserModel = require('../models/UserModel');

const UserController = {
    getBookingPage: async (req, res) => {
        try {
            const users = await UserModel.findAll();
            res.render('booking', { users });
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },

    getUserDetails: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send('Error fetching user');
        }
    },

    createUser: async (req, res) => {
        try {
            const newUserId = await UserModel.create(req.body);
            res.status(201).send(`User created with ID: ${newUserId}`);
        } catch (error) {
            res.status(500).send('Error creating user');
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedRows = await UserModel.delete(req.params.id);
            if (deletedRows > 0) {
                res.send('User deleted');
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send('Error deleting user');
        }
    }
};

module.exports = UserController;
