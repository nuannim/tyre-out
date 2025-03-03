const EmployeeModel = require('../models/EmployeeModel');


const EmployeeController = {
    
    getadminPage: async (req, res) => {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/login');
        }

        try {
            const employeeid = req.session.user.employeeAccountId;
            const employee = await EmployeeModel.findByEmployeefirstName(employeeid);

            const user = employee && employee.firstName ? employee : { firstName: "Unknown" };
    
            res.render("admin_appointment", { user });
        } catch (error) {
            console.error("error:", error);
            res.status(500).send("Server Error");
        }
    },

    getadminassignPage: async (req, res) => {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/login');
        }

        try {
            const employeeid = req.session.user.employeeAccountId;
            const employee = await EmployeeModel.findByEmployeefirstName(employeeid);

            const user = employee && employee.firstName ? employee : { firstName: "Unknown" };
    
            res.render("admin_assign", { user });
        } catch (error) {
            console.error("error:", error);
            res.status(500).send("Server Error");
        }
    },
    

};


module.exports = EmployeeController;