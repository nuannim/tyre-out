const db = require('./dbconn.js');

const BookingModel = {
    getNoAcceptServiceHistory: async (employeeId) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT centerId
                FROM Employees
                WHERE employeeId = ${employeeId}`, (err, d) => {
                if (err) reject(err);
                else db.all(`SELECT * 
FROM ServiceHistory sh
INNER JOIN ServiceBranch sb 
    ON sh.centerId = sb.centerId
INNER JOIN RegistrationNumber rn 
    ON sh.regId = rn.regId
INNER JOIN Customers c
    ON rn.customerId = c.customerId 
INNER JOIN Cars car 
    ON rn.carId = car.carId
WHERE sh.centerId = ${d.centerId} and sh.handledByEmployeeId is NULL;`, (err, d) => {
                    if (err) reject(err);
                    else resolve(d);
                });
            });
        });
    },

    getAcceptServiceHistory: async (employeeId) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT centerId
                FROM Employees
                WHERE employeeId = ${employeeId}`, (err, d) => {
                if (err) reject(err);
                else db.all(`SELECT * 
FROM ServiceHistory sh
INNER JOIN ServiceBranch sb 
    ON sh.centerId = sb.centerId
INNER JOIN RegistrationNumber rn  
    ON sh.regId = rn.regId
INNER JOIN Customers c
    ON rn.customerId = c.customerId 
INNER JOIN Cars car 
    ON rn.carId = car.carId
WHERE sh.centerId = ${d.centerId} and sh.handledByEmployeeId = ${employeeId} AND sh.status = 0;`, (err, d) => {
                    if (err) reject(err);
                    else resolve(d);
                });
            });
        });
    },
    getAllAcceptServiceHistory: async (employeeId) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT centerId
                FROM Employees
                WHERE employeeId = ${employeeId}`, (err, d) => {
                if (err) reject(err);
                else db.all(`SELECT *
                    FROM ServiceHistory sh
                    JOIN Customers c ON sh.customerId = c.customerId
                    WHERE sh.centerId = ${d.centerId} AND sh.status = 0 AND sh.handledByEmployeeId IS NOT NULL`, (err, d) => {
                    if (err) reject(err);
                    else resolve(d);
                });
            });
        });
    },
    getAllAcceptedServiceHistory: async (employeeId) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT centerId
                FROM Employees
                WHERE employeeId = ${employeeId}`, (err, d) => {
                if (err) reject(err);
                else db.all(`SELECT *
                    FROM ServiceHistory sh
                    JOIN Customers c ON sh.customerId = c.customerId
                    WHERE sh.centerId = ${d.centerId} AND sh.status = 1 AND sh.handledByEmployeeId IS NOT NULL`, (err, d) => {
                    if (err) reject(err);
                    else resolve(d);
                });
            });
        });
    }
    ,
    getAcceptedServiceHistory: (employeeId) => {
        return new Promise((resolve, reject) => {
            db.all(`
                SELECT *
                FROM ServiceHistory sh
                JOIN Customers c ON sh.customerId = c.customerId
                WHERE sh.handledByEmployeeId = ${employeeId} AND sh.status = 1
            `, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },
    
    updateHandledByEmployeeId: (serviceHistoryId, employeeId) => {
        return new Promise((resolve, reject) => {
            console.log('Updating ServiceHistory:', { serviceHistoryId, employeeId });
            const query = `
                UPDATE ServiceHistory
                SET handledByEmployeeId = ?
                WHERE serviceHistoryId = ?
            `;
            db.run(query, [employeeId, serviceHistoryId], function(err) {
                if (err) {
                    return reject(err);
                }
                console.log('Rows updated:', this.changes);
                resolve(this.changes);
            });
        });
    }
};

module.exports = BookingModel;