const UserModel = require('../models/UserModel');
const EmployeeModel = require('../models/EmployeeModel');
const crypto = require('crypto');

const db = require('../models/dbconn.js'); 

const UserController = {

    getIndexPage: async (req, res) => {
        const email = req.session.user ? req.session.user.email : 'Guest';
        const p = await UserModel.allPromotion();
        const sb = await UserModel.allServiceBranch();
        const car = await UserModel.allCars();
        
        const g = await UserModel.allGoods();
        const cuscar = await UserModel.CustomerCars(email);

        console.log(p);
        console.log(sb);

        res.render('index', {
                        email: email,
                        promotions: p,
                        servicebranches: sb,
                        cars: car,
                        cuscars: cuscar,
                        goods: g
        });
    },

    getAppointmentPage: async (req, res) => {
        console.log('===== getAppointmentPage in UserController.js =====');

        const email = req.session.user ? req.session.user.email : 'Guest';
        const car = await UserModel.allCars();
        const cuscar = await UserModel.CustomerCars(email);
        const sb = await UserModel.allServiceBranch();

        try {
            res.render('appointment',{
                email: email,
                cars: car,
                cuscars: cuscar,
                servicebranches: sb
                
            });
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },

    getHistoryPage: async (req, res) => { 
        if (!req.session.user) {
            return res.redirect("/login"); 
        }

        try {
            const email = req.session.user.email;

            const h = await UserModel.allHistory(email);
            res.render('history', {data: h});
            console.log('h: ' + h)

        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },

    processSignin: async (req, res) => {
        let formdata = {
            username2: req.body.username,
            password2: req.body.password
        };

        console.log(formdata);

        if (!formdata.username2 || !formdata.password2) {
            return res.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบ" });
        }

        try {
            const [employee, customer] = await Promise.all([
                EmployeeModel.findByEmployeeAccountId(formdata.username2),
                UserModel.findByEmail(formdata.username2)
            ]);

            if (employee) {
                const hashedInputPassword = crypto.createHash('sha256').update(formdata.password2).digest('hex');
                if (employee.password !== hashedInputPassword) {
                    return res.json({ success: false, message: "รหัสผ่านผิด" });
                }
    
                req.session.user = { employeeAccountId: employee.employeeAccountId, role: 'admin' };
    
                res.cookie('userSession', employee.employeeAccountId, { 
                    httpOnly: true, 
                    secure: false, 
                    sameSite: 'strict', 
                    maxAge: 1000 * 60 * 60
                });
    
                return res.json({ success: true, redirect: '/admin' });
            }

            if (customer) {
                if (customer.phoneNumber !== formdata.password2) {
                    console.log(customer.phoneNumber);
                    return res.json({ success: false, message: "รหัสผ่านผิด" });
                }

                req.session.user = { email: customer.email, role: 'customer' };
    
                res.cookie('userSession', customer.email, { 
                    httpOnly: true, 
                    secure: false, 
                    sameSite: 'strict', 
                    maxAge: 1000 * 60 * 60
                });
    
                return res.json({ success: true, redirect: '/' });
            }

            return res.json({ success: false, message: "ไม่พบบัญชี" });
    
        } catch (err) {
            console.error(err);
            return res.json({ success: false, message: "Server Error" });
        }
    },

    logout: async (req, res) => {
        res.clearCookie('userSession');
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/');
        });
    },

    getLoginPage: async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    },

    CarsaveCustomer: async (req, res) => {
        const { sel1, sel2, sel3, sel4, carRegis, email } = req.body;

        console.log(req.body);

        if (!sel1 || !sel2 || !sel3 || !email || !carRegis) {
            return res.status(400).send("กรุณากรอกข้อมูลให้ครบ");
        }

        const findcar = `SELECT carId FROM Cars WHERE carModel = ? AND carYear = ? AND carGrade = ?`;

        db.get(findcar, [sel1, sel2, sel3], (err, carRow) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Car find error');
            }

            if (!carRow) {
                return res.status(404).send('Car not found');
            }

            const carId = carRow.carId;

            const findcus = `SELECT customerId FROM Customers WHERE email = ?`;

            db.get(findcus, [email], (err, customerRow) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Cant find customer');
                }

                if (!customerRow) {
                    return res.status(404).send('NOt found');
                }

                const customerId = customerRow.customerId;

                const forinsert = `INSERT INTO RegistrationNumber (carId, customerId, mileage, carRegisNo) 
                VALUES (?, ?, ?, ?)`;

                db.run(forinsert, [carId, customerId, sel4, carRegis], function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('save error');
                    }
                    console.log(`ID: ${this.lastID}`);
                    res.redirect('/');
                });
            });
        });
    },

    getMaintenanceGoods: async (req, res) => { 
        try {
            const { carModel, carYear, carGrade, mileage } = req.query;

            const mg = await UserModel.maintenanceGoods(carModel, carYear, carGrade, mileage);

            console.log('rows: ', JSON.stringify(mg, null, 2));
            res.json(mg);
    
        } catch (err) {
            res.status(500).json({ 
                error: err.message 
            });
        }
    },

    createAppointment: async (req, res) => {
        try {
            const {
                carModel, carYear, carGrade, mileage, 
                centerId, caseStartDatetime,
                slot, caseCategory, 
                guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
                goodsIdList
            } = req.body;

            let customerId;

            const data = await UserModel.createAppointment(
                mileage, 
                centerId, caseStartDatetime, 
                slot, caseCategory, 
                guestFirstName, guestLastName, guestEmail, guestTel, guestCarRegisNo,
                goodsIdList,
                customerId);

            console.log('rows: ', JSON.stringify(data, null, 2));
            res.status(201).json(data);

        } catch (err) {
            res.status(500).json({ 
                error: err.message 
            });
        }
    },

    getLoggedInUser: async (req, res) => {
        const email = req.query.email;

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
            res.json(rows);
        });
    },

    getDistricts: async (req, res) => {
        const { province } = req.query;

        const district = await UserModel.selectDistricts(province);

        res.send(JSON.stringify(district));
    },

    getSelectedProvinceAndDistrict: async (req, res) => {
        const { province, district } = req.query;

        const result = await UserModel.showSelectedSalted(province, district);
        res.send(JSON.stringify(result));
    },

    getSelectFromProvince: async (req, res) => {
        const { province } = req.query;

        const result = await UserModel.selectFromProvince(province);

        res.send(JSON.stringify(result));
    },

    getGoods: async (req, res) => {
        const g = await UserModel.allGoods();
        const email = req.session.user ? req.session.user.email : 'Guest';
        res.render('goods', {
            goods: g,
            email: email
        });
    },

    getCarGrade: async (req, res) => {
        const { c } = req.query;

        const result = await UserModel.CarGrades(c);

        res.send(JSON.stringify(result));
    }
};

module.exports = UserController;
