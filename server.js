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
app.post('/appointment', (req, res) => {
    // const bookingData = req.body;
    const {
        carModel, carYear, carGrade, mileage, 
        centerId, caseStartDatetime,
        slot, caseCategory, 
        guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
        goodsIdList
    } = req.body;

    let customerId;

    // const values = [
    //     carModel, carYear, carGrade, mileage, 
    //     centerId, caseStartDatetime,
    //     slot, caseCategory, 
    //     guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
    //     goodsIdList
    // ];

    // const query = `INSERT INTO bookings 
    // (carModel, carYear, carGrade, mileage, 
    // centerId, caseStartDatetime,
    // slot, caseCategory, 
    // guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
    // goodsIdList) 
    // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const queryForCustomers = `insert into Customers 
                    (firstName, lastName, phoneNumber, email)
                    values (?, ?, ?, ?)`;

    db.run(queryForCustomers, [guestFirstName, guestLastName, guestTel, guestEmail], function (err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error creating customer' });
            return;
        }
        customerId = this.lastID;

        const queryForRegistrationNumber = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) 
                                            VALUES (?, ?, ?, ?)`;

        const carId = 1;  // คุณจะต้องกำหนด carId ที่จะใช้ หรือดึงจากข้อมูลที่มีอยู่

        db.run(queryForRegistrationNumber, [carId, customerId, mileage, guestCarRegisNo], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error inserting into RegistrationNumber' });
                return;
            }

            // * หลังจากที่เพิ่มข้อมูลลงใน RegistrationNumber แล้ว เพิ่มข้อมูลลงใน ServiceHistory
            const values = [
                customerId, caseCategory, slot, caseStartDatetime, centerId
            ];

            const query = `insert into ServiceHistory (customerId, caseCategory, slot, caseStartDatetime, centerId)
                values (?, ?, ?, ?, ?)`;

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

                // แก้ไขให้การตอบกลับเมื่อสร้าง booking สำเร็จเป็น JSON
                res.status(201).json({ message: 'Booking created successfully', serviceHistoryId });
            });
        });
    });
});

app.get('/getLoggedInUser', (req, res) => {
    const email = req.query.email;
    
    db.all(`
        SELECT Customers.*, RegistrationNumber.carRegisNo 
        FROM Customers 
        LEFT JOIN RegistrationNumber ON Customers.customerId = RegistrationNumber.customerId
        WHERE Customers.email = ?`, [email], (err, rows) => {
        
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // ส่งข้อมูลที่ได้จากการ join ทั้งสองตาราง
        res.json(rows[0]);
    });
});




app.post('/appointmentLoggedIn', (req, res) => {
    const {
        // carModel, carYear, carGrade, 
        mileage, 
        centerId, caseStartDatetime,
        slot, caseCategory, 
        // guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
        goodsIdList, customerId
    } = req.body;

    const values = [
        customerId, caseCategory, slot, caseStartDatetime, centerId
    ];

    const query = `INSERT INTO ServiceHistory (customerId, caseCategory, slot, caseStartDatetime, centerId)
        VALUES (?, ?, ?, ?, ?)`;

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
