const BookingModel = require('../models/BookingModel');

const BookingController = {
    getAllBookings: async (req, res) => {
        try {
            const bookings = await BookingModel.findAll();
            res.render('bookings/index', { bookings });
        } catch (error) {
            res.status(500).send('Error fetching bookings');
        }
    },

    // getBookingById: async (req, res) => {
    //     try {
    //         const booking = await BookingModel.findById(req.params.id);
    //         if (booking) {
    //             res.render('bookings/show', { booking });
    //         } else {
    //             res.status(404).send('Booking not found');
    //         }
    //     } catch (error) {
    //         res.status(500).send('Error fetching booking');
    //     }
    // },

    createBooking: async (req, res) => {
        try {
            const { carModel, mileage, branch, appointmentDate, firstName, lastName, email, carRegistration } = req.body;

            const bookingData = {
                customerName: `${firstName} ${lastName}`,
                carModel,
                mileage,
                branch,
                appointmentDate,
                email,
                carRegistration,
                status: 'Pending'
            };


            const bookingId = await BookingModel.create(bookingData);

            res.status(201).send(`Booking created with ID: ${bookingId}`);
        } catch (error) {
            res.status(500).send('Error creating booking');
        }
    }

    // updateBooking: async (req, res) => {
    //     try {
    //         await BookingModel.update(req.params.id, req.body);
    //         res.send('Booking updated successfully');
    //     } catch (error) {
    //         res.status(500).send('Error updating booking');
    //     }
    // },

    // deleteBooking: async (req, res) => {
    //     try {
    //         await BookingModel.delete(req.params.id);
    //         res.send('Booking deleted successfully');
    //     } catch (error) {
    //         res.status(500).send('Error deleting booking');
    //     }
    // }
};

module.exports = BookingController;