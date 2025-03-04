const EmployeeController = require('../controllers/EmployeeController');
const authMiddleware = require('../middleware/auth');

module.exports = function(app) {
    // app.get('/', EmployeeController.getIndexPage);
    app.get('/admin', authMiddleware, EmployeeController.getadminPage);
    app.get('/admin_assign', authMiddleware, EmployeeController.getadminassignPage);
    app.post('/acceptCase', EmployeeController.acceptCase);
    // app.get('/history', EmployeeController.getHistoryPage);
};
