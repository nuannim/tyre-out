const db = require('./dbconn.js');

const EmployeeModel = {
    findByEmployeeAccountId: (employeeAccountId) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM EmployeeAccount WHERE employeeAccountId = ? LIMIT 1`;
    
            db.get(query, [employeeAccountId], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    },
    findByEmployeefirstName: (employeeAccountId) => {
        return new Promise((resolve, reject) => {
                const query = `SELECT e.firstName, e.lastName, sb.centerName, sb.telephone, sb.address
                    FROM Employees e
                    INNER JOIN EmployeeAccount ea ON e.employeeId = ea.employeeId
                    INNER JOIN ServiceBranch sb ON e.centerId = sb.centerId
                    WHERE ea.employeeAccountId = ?`;

            db.get(query, [employeeAccountId], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row || { firstName: "Unknown" }); // กำหนดค่าเริ่มต้นถ้าไม่มีข้อมูล
            });
        });
    },
    updateCaseStatus: (serviceHistoryId, status) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ServiceHistory
                SET status = ?
                WHERE serviceHistoryId = ?
            `;
            db.run(query, [status, serviceHistoryId], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes); // Return the number of rows updated
            });
        });
    },
    updateServiceHistory: (service, dated, serviceHistoryId) => {
        return new Promise((resolve, reject) => {
        
            const query = `
                UPDATE ServiceHistory
                SET caseCategory =?, caseStartDatetime = ?
                WHERE serviceHistoryId = ?
            `;
            db.run(query, [service, dated, serviceHistoryId], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes); // Return the number of rows updated
            });
        });
    },
    getServiceHistoryWithCustomer: (serviceHistoryId) => {
        return new Promise((resolve, reject) => {
            const query = `
              SELECT * 
FROM ServiceHistory sh
INNER JOIN ServiceBranch sb 
    ON sh.centerId = sb.centerId
INNER JOIN RegistrationNumber rn
    ON sh.regId = rn.regId        
INNER JOIN Customers c            
    ON rn.customerId = c.customerId 
INNER JOIN Cars car 
    ON rn.carId = car.carId
WHERE sh.serviceHistoryId = ?;
            `;
            db.get(query, [serviceHistoryId], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    },
    getServiceHistoryWithCustomerwithGoods: (serviceHistoryId) => {
        console.log("check"+serviceHistoryId);
        return new Promise((resolve, reject) => {
            const query = `
              SELECT g.goodsPrice, g.goodsName
FROM ServiceHistory sh
INNER JOIN ServiceBranch sb 
    ON sh.centerId = sb.centerId
INNER JOIN ServiceHistoryDetails shd 
    ON sh.serviceHistoryId = shd.serviceHistoryId  
INNER JOIN Goods g 
    ON shd.goodsId = g.goodsId                
INNER JOIN RegistrationNumber rn
    ON sh.regId = rn.regId
INNER JOIN Customers c
    ON rn.customerId = c.customerId
INNER JOIN Cars car 
    ON rn.carId = car.carId
WHERE sh.serviceHistoryId = ${serviceHistoryId};
            `;
            db.all(query, (err, row) => {
                if (err) {
                    return reject(err);
                }
                console.log(row);
                resolve(row);
            });
        });
    },
    deleteServiceHistory: (serviceHistoryId) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM ServiceHistory
                WHERE serviceHistoryId = ?
            `;
            db.run(query, [serviceHistoryId], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes); // Return the number of rows deleted
            });
        });
    }
    // updateHandledByEmployeeId: (serviceHistoryId, employeeId) => {
    //     return new Promise((resolve, reject) => {
    //         const query = `
    //             UPDATE ServiceHistory
    //             SET handledByEmployeeId = ?
    //             WHERE serviceHistoryId = ?
    //         `;
    //         db.run(query, [employeeId, serviceHistoryId], function(err) {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             resolve(this.changes); // Return the number of rows updated
    //         });
    //     });
    // }
};

module.exports = EmployeeModel;