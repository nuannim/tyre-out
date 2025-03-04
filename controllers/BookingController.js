const BookingModel = require('../models/BookingModel');

const BookingController = {

    getServiceHistoryByCenterAndStatus: async (req, res) => {
        try {
            const { centerId, status } = req.query; // Assuming centerId and status are passed as query parameters
            const serviceHistory = await BookingModel.getServiceHistory(centerId, status);
            res.json(serviceHistory);
        } catch (error) {
            res.status(500).send('Error retrieving service history');
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