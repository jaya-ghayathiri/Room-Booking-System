const express=require("express");
const Router=express.Router();
const bookingController=require('../controller/bookingContoller');
// Router.get('/bookings', bookingController.getAllBookings);
Router.post('/bookings', bookingController.createBooking);
Router.put('/bookings/:id', bookingController.updateBooking);
// Router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = Router;