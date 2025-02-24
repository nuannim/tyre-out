const EmployeeController = require('../controllers/EmployeeController');

module.exports = function(app) {
    // app.get('/', EmployeeController.getIndexPage);
    app.get('/admin', EmployeeController.getadminPage);
    // app.get('/history', EmployeeController.getHistoryPage);
};
