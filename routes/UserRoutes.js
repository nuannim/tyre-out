const UserController = require('../controllers/UserController');

module.exports = function(app) {
    app.get('/', UserController.getIndexPage);
    app.get('/appointment', UserController.getAppointmentPage);
    app.get('/history', UserController.getHistoryPage);
    app.post('/process_signin', UserController.processSignin);
    app.get('/logout', UserController.logout);
    app.get('/login', UserController.getLoginPage);
    app.post('/saveCar', UserController.CarsaveCustomer);

    app.get('/district', UserController.getDistricts);
    app.get('/SelectedProvinceAndDistrict', UserController.getSelectedProvinceAndDistrict);
    app.get('/province', UserController.getSelectFromProvince);
    app.get('/goods', UserController.getGoods);
    app.get('/getModel', UserController.getCarGrade);
    app.get('/getMaintenanceGoods', UserController.getMaintenanceGoods);

    app.post('/appointment', UserController.createAppointment);
    app.get('/getLoggedInUser' , UserController.getLoggedInUser);
};
