const db = require('./dbconn.js');

const BookingModel = {
    getServiceHistory: async (centerId, status) => {
        try {
            const query = `
                SELECT * FROM ServiceHistory
                WHERE centerId = ? AND status = ?
            `;
            const [results] = await db.execute(query, [centerId, status]);
            return results;
        } catch (error) {
            throw new Error('Error retrieving service history');
        }
    },
    getServiceHistory: async (centerId, status) => {
        try {
            const query = `
                SELECT * FROM ServiceHistory
                WHERE centerId = ? AND status = ?
            `;
            const [results] = await db.execute(query, [centerId, status]);
            return results;
        } catch (error) {
            throw new Error('Error retrieving service history');
        }
    },

    
    findAll: async () => {
        try {
            const [rows] = await db.query('SELECT * FROM Bookings');
            return rows;
        } catch (error) {
            throw error;
        }
    },

    findById: async (bookingId) => {
        try {
            const [rows] = await db.query('SELECT * FROM Bookings WHERE bookingId = ?', [bookingId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    },

    create: async (bookingData) => {
        const { customerName, carModel, mileage, branch, appointmentDate, email, carRegistration, status } = bookingData;
        try {
            const [result] = await db.query(
                'INSERT INTO Bookings (customerName, carModel, mileage, branch, appointmentDate, email, carRegistration, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [customerName, carModel, mileage, branch, appointmentDate, email, carRegistration, status]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // update: async (bookingId, bookingData) => {
    //     const { customerId, carId, serviceType, appointmentDate, status } = bookingData;
    //     try {
    //         await db.query(
    //             'UPDATE Bookings SET customerId = ?, carId = ?, serviceType = ?, appointmentDate = ?, status = ? WHERE bookingId = ?',
    //             [customerId, carId, serviceType, appointmentDate, status, bookingId]
    //         );
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    // delete: async (bookingId) => {
    //     try {
    //         await db.query('DELETE FROM Bookings WHERE bookingId = ?', [bookingId]);
    //     } catch (error) {
    //         throw error;
    //     }
    // }
};

module.exports = BookingModel;