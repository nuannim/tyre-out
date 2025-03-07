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
const { queryObjects } = require('v8');
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//* routing
require('./routes/UserRoutes.js')(app);
require('./routes/EmployeeRoutes.js')(app);

// ! เดี๋ยวมาย้าย
app.get('/getLoggedInUser', (req, res) => {
    const email = req.query.email;

    // const query = `
    //     SELECT Customers.*, RegistrationNumber.carRegisNo 
    //     FROM Customers 
    //     LEFT JOIN RegistrationNumber ON Customers.customerId = RegistrationNumber.customerId
    //     WHERE Customers.email = ?`;

    const query = `
        SELECT *
        FROM Customers 
        LEFT JOIN RegistrationNumber ON Customers.customerId = RegistrationNumber.customerId
        WHERE Customers.email = ?`;
    
    db.all(query, [email], (err, rows) => {
        
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // ส่งข้อมูลที่ได้จากการ join ทั้งสองตาราง
        res.json(rows);
        // res.json(rows[0]);
    });
});






app.post('/appointmentLoggedIn', (req, res) => {
    const {
        // carModel, carYear, carGrade, 
        mileage, 
        centerId, caseStartDatetime,
        slot, caseCategory, 
        // guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
        goodsIdList, customerId, regId
    } = req.body;

    
    const updateMileageQuery = `UPDATE RegistrationNumber SET mileage = ? WHERE customerId = ?`;

    db.run(updateMileageQuery, [mileage, customerId], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error updating mileage' });
            return;
        }

        const values = [
            customerId, caseCategory, slot, caseStartDatetime, centerId, regId, 0, mileage
        ];

        const query = `INSERT INTO ServiceHistory 
            (customerId, caseCategory, slot, caseStartDatetime, centerId, regId, status, caseSummary)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run(query, values, function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error creating service history' });
                return;
            }

            const serviceHistoryId = this.lastID;
            const serviceHistoryDetailsValues = goodsIdList.map(goodsId => [serviceHistoryId, goodsId]);
            const serviceHistoryDetailsQuery = `INSERT INTO ServiceHistoryDetails (serviceHistoryId, goodsId) VALUES (?, ?)`;

            serviceHistoryDetailsValues.forEach(values => {
                db.run(serviceHistoryDetailsQuery, values, function (err) {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Error creating service history details' });
                        return;
                    }
                });
            });

            res.status(201).json({ message: 'Booking created successfully', serviceHistoryId });
        });
    });
});


// app.get('/getShowDetail/:serviceHistoryId', (req, res) => {
//     const serviceHistoryId = req.params.serviceHistoryId;

//     const query = ``;

//     db.all(query, [serviceHistoryId], (err, rows) => {
        
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }

//         res.json(rows);
//     });
// });



// from lab class
app.listen(port, () => {
    console.log('✅ Server is running on port 3000');
});
