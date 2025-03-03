const UserController = require('../controllers/UserController');
// const BookingController = require('../controllers/BookingController');

module.exports = function(app) {
    // & ตัวอย่างของ chat
    // app.get('/booking', UserController.getBookingPage);
    // app.get('/user/:id', UserController.getUserDetails);
    // app.post('/user', UserController.createUser);
    // app.delete('/user/:id', UserController.deleteUser);
    
//* chat said การเขียนแบบนี้ไม่ถูก mvc ต้องให้ UserController.js เป็นตัวจัดการ
    // app.get('/', function (req, res) {
    //     res.render('index')
    //     res.end()
    // })

    // app.get('/appointment', function (req, res) {
    //     res.render('appointment')
    //     res.end()
    // })

    // app.get('/history', function (req, res) {
    //     res.render('history')
    //     res.end()
    // })

//* แชทเลยเปลี่ยนมาเป็นแบบนี้
    app.get('/', UserController.getIndexPage);
    app.get('/appointment', UserController.getAppointmentPage);
    app.get('/history', UserController.getHistoryPage);
    app.post('/process_signin', UserController.processSignin);
    app.get('/logout', UserController.logout);
    app.get('/login', UserController.getLoginPage);
    app.post('/saveCar', UserController.CarsaveCustomer);
    // app.post('/booking', BookingController.createBooking);

    app.get('/getMaintenanceGoods', UserController.getMaintenanceGoods);
    app.post('/appointment', UserController.createAppointment); // ! ยังไม่ได้สร้าง createAppointment() ใน UserController.js
};
