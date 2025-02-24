// from lab class
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const session = require('express-session');

app.use(session({
    secret: 'minimax321',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 }
}));

const db = require('./models/dbconn.js');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// & from P'Chat 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* routing
require('./routes/UserRoutes.js')(app);
// require('./routes/EmployeeRoutes.js')(app);

// from lab class
app.listen(port, () => {
    console.log('✅ Server is running on port 3000');
});
