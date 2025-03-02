const EmployeeModel = require('../models/EmployeeModel');


const EmployeeController = {
    
    getadminPage: async (req, res) => {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/login');
        }
        res.render('admin_appointment', { user: req.session.user });
    },

    getadminassignPage: async (req, res) => {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/login');
        }
        res.render('admin_assign', { user: req.session.user });
    }

};


module.exports = EmployeeController;