const UserController = require('../controllers/UserController');

module.exports = function(app) {
    // app.get('/booking', UserController.getBookingPage);
    // app.get('/user/:id', UserController.getUserDetails);
    // app.post('/user', UserController.createUser);
    // app.delete('/user/:id', UserController.deleteUser);

    app.get('/', function (req, res) {
        res.render('booking')
        res.end()
    })

};
