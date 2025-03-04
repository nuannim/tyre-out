const db = require('./dbconn.js');

const BookingModel = {
    getNoAcceptServiceHistory: async (employeeId) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT centerId
                FROM Employees
                WHERE employeeId = ${employeeId}`, (err, d) => {
                if (err) reject(err);
                else db.all(`SELECT sh.*, c.firstName, c.lastName, c.phoneNumber
                    FROM ServiceHistory sh
                    JOIN Customers c ON sh.customerId = c.customerId
                    WHERE sh.centerId = ${d.centerId} AND sh.handledByEmployeeId IS NULL`, (err, d) => {
                    if (err) reject(err);
                    else resolve(d);
                });
            });
        });
        // try {
        //     console.log('Fetching centerId for employeeId:', employeeId); // Log employeeId
        //     const sql = `
        //         SELECT centerId
        //         FROM Employees
        //         WHERE employeeId = ?
        //     `;
        //     const centerResult = await db.get(sql, [employeeId]); // Get single result
        //     console.log('Center result:', centerResult); // Log centerResult
        //     const centerId = centerResult?.centerId; // Extract centerId from the result
        //     if (!centerId) {
        //         throw new Error('Center ID not found for the given employee ID');
        //     }

        //     const query = `
        //         SELECT *
        //         FROM ServiceHistory 
        //         WHERE centerId = ? AND status = 0
        //     `;
        //     const results = await db.all(query, [centerId]); // Get all results
        //     console.log(results);
        //     return results;
            
        // } catch (error) {
        //     console.error('Error retrieving service history:', error);
        //     throw new Error('Error retrieving service history');
        // }
    },
    getAcceptServiceHistory: async (employeeId) => {
        return new Promise((resolve, reject) => {
            db.get(`SELECT centerId
                FROM Employees
                WHERE employeeId = ${employeeId}`, (err, d) => {
                if (err) reject(err);
                else db.all(`SELECT sh.*, c.firstName, c.lastName, c.phoneNumber
                    FROM ServiceHistory sh
                    JOIN Customers c ON sh.customerId = c.customerId
                    WHERE sh.centerId = ${d.centerId} AND sh.handledByEmployeeId = ${employeeId}`, (err, d) => {
                    if (err) reject(err);
                    else resolve(d);
                });
            });
        });
    },
    updateHandledByEmployeeId: (serviceHistoryId, employeeId) => {
        return new Promise((resolve, reject) => {
            console.log('Updating ServiceHistory:', { serviceHistoryId, employeeId }); // Log the IDs
            const query = `
                UPDATE ServiceHistory
                SET handledByEmployeeId = ?
                WHERE serviceHistoryId = ?
            `;
            db.run(query, [employeeId, serviceHistoryId], function(err) {
                if (err) {
                    return reject(err);
                }
                console.log('Rows updated:', this.changes); // Log the number of rows updated
                resolve(this.changes); // Return the number of rows updated
            });
        });
    }
    
    // ... existing code ...
};

module.exports = BookingModel;