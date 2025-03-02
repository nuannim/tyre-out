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
    }
};

module.exports = EmployeeModel;