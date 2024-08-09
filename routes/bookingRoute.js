const express=require("express");
const Router=express.Router();
const bookingController=require('../controller/bookingContoller');
const auth = require('../middleware/auth');
// Router.get('/bookings', bookingController.getAllBookings);
Router.post('/bookings',auth, bookingController.createBooking);
Router.put('/bookings/:id',auth, bookingController.updateBooking);
// Router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = Router;