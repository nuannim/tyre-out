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
            const acceptedService = await BookingModel.getAcceptedServiceHistory(employeeid);
            const allAcceptService = await BookingModel.getAllAcceptServiceHistory(employeeid);
            const allAcceptedService = await BookingModel.getAllAcceptedServiceHistory(employeeid);
            const user = employee && employee.firstName ? employee : { firstName: "Unknown" };
    
            res.render("admin_appointment", { user, service, acceptedService, allAcceptService, allAcceptedService});
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
                res.json({ success: true, message: 'Service history updated successfully' });
            } else {
                res.status(404).send('Service history not found');
            }
        } catch (error) {
            console.error("Error accepting case:", error);
            res.status(500).send("Server Error");
        }
    },
    updateCaseStatus: async (req, res) => {
        try {
            const { serviceHistoryId } = req.body;
            const status = 1;

            const result = await EmployeeModel.updateCaseStatus(serviceHistoryId, status);
            if (result > 0) {
                return res.redirect('/admin');
            } else {
                res.status(404).send('Service history not found');
            }
        } catch (error) {
            console.error("Error updating case status:", error);
            res.status(500).send("Server Error");
        }
    },
    updateServiceHistory: async (req, res) => {
        try {
            const { service, dated, servicehis} = req.body;
            const result = await EmployeeModel.updateServiceHistory(service, dated, servicehis);
            if (result > 0) {
                res.json({ success: true, message: 'Service history updated successfully' });
            } else {
                res.status(404).json({ success: false, message: 'Service history not found' });
            }
        } catch (error) {
            console.error("Error updating service history:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },
    getServiceHistory: (req, res) => {
        const { id } = req.query;
        console.log(id);
        EmployeeModel.getServiceHistoryWithCustomer(id)
            .then(data => {
                if (data) {
                    console.log("successsssssss");
                    res.json(data);
                } else {
                    res.status(404).json({ message: 'Service history not found' });
                }
            })
            .catch(err => {
                console.error('Error fetching service history:', err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },
    getServiceHistorywithGoods: (req, res) => {
        const { id } = req.query;
        console.log(id);
        EmployeeModel.getServiceHistoryWithCustomerwithGoods(id)
            .then(data => {
                if (data) {
                    console.log("success");
                    res.json(data);
                } else {
                    res.status(404).json({ message: 'Service history not found' });
                }
            })
            .catch(err => {
                console.error('Error fetching service history:', err);
                res.status(500).json({ message: 'Internal server error' });
            });
    },
    deleteServiceHistory: (req, res) => {
        const { serviceHistoryId } = req.params;
        EmployeeModel.deleteServiceHistory(serviceHistoryId)
            .then(changes => {
                if (changes > 0) {
                    res.json({ success: true, message: 'Service history deleted successfully' });
                } else {
                    res.status(404).json({ success: false, message: 'Service history not found' });
                }
            })
            .catch(err => {
                console.error('Error deleting service history:', err);
                res.status(500).json({ success: false, message: 'Internal server error' });
            });
    }
};

module.exports = EmployeeController;
