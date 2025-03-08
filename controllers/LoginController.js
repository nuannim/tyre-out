const UserModel = require('../models/UserModel');

const LoginController = {
    postLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await LoginModel.findUserByCredentials(email, password);
            if (user) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.status(401).send('Invalid email or password');
            }
        } catch (error) {
            res.status(500).send('Error during login');
        }
    }

};

module.exports = LoginController;
