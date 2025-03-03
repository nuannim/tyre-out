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
    }
};

module.exports = EmployeeModel;