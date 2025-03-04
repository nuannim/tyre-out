const EmployeeModel = require('../models/EmployeeModel');
const BookingModel = require('../models/BookingModel');

const EmployeeController = {
    
    getadminPage: async (req, res) => {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.redirect('/login');
        }

        try {
            const employeeid = req.session.user.employeeAccountId;
            const employee = await EmployeeModel.findByEmployeefirstName(employeeid);
            const service = await BookingModel.getAcceptServiceHistory(employeeid);
            const user = employee && employee.firstName ? employee : { firstName: "Unknown" };
    
            res.render("admin_appointment", { user, service });
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
            const service = await BookingModel.getNoAcceptServiceHistory(employeeid);
            const user = employee && employee.firstName ? employee : { firstName: "Unknown" };
    
            res.render("admin_assign", { user, service});
        } catch (error) {
            console.error("error:", error);
            res.status(500).send("Server Error");
        }
    },
    acceptCase: async (req, res) => {
        try {
            const { serviceHistoryId } = req.body;
            const employeeId = req.session.user.employeeAccountId;

            const result = await BookingModel.updateHandledByEmployeeId(serviceHistoryId, employeeId);
            if (result > 0) {
                return res.redirect('/admin_assign');
            } else {
                res.status(404).send('Service history not found');
            }
        } catch (error) {
            console.error("Error accepting case:", error);
            res.status(500).send("Server Error");
        }
    }



};


module.exports = EmployeeController;