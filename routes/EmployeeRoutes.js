const EmployeeController = require('../controllers/EmployeeController');
const authMiddleware = require('../middleware/auth');

module.exports = function(app) {
    // app.get('/', EmployeeController.getIndexPage);
    app.get('/admin', authMiddleware, EmployeeController.getadminPage);
    app.get('/admin_assign', authMiddleware, EmployeeController.getadminassignPage);
    app.post('/acceptCase', EmployeeController.acceptCase);
    app.post('/update-case-status', EmployeeController.updateCaseStatus);
    app.post('/update-service-history', EmployeeController.updateServiceHistory);
    app.get('/service-history', EmployeeController.getServiceHistory);
    app.delete('/service-history/:serviceHistoryId', EmployeeController.deleteServiceHistory);
    app.get('/service-history-Goods', EmployeeController.getServiceHistorywithGoods);
    // app.get('/history', EmployeeController.getHistoryPage);
};
