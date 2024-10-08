const mongoose = require("mongoose");
const Booking = require("../model/bookingModel");
const Room = require("../model/roomModel");
const { v4: uuidv4 } = require('uuid');


const createBooking = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("User from auth middleware:", req.user);
    try {
        // Assuming userId is attached to req.user by authentication middleware
        const userId = req.user.id;
        const { roomId, date, startTime, endTime } = req.body;

        if (!roomId || !date || !startTime || !endTime) {
            return res.status(400).json({ error: "All fields are mandatory" });
        }

        // Fetch room based on roomId
        const room = await Room.findOne({ id: roomId });
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Check for overlapping bookings
        const overlappingBooking = await Booking.findOne({
            roomId,
            date,
            isActive: true,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lt: endTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (overlappingBooking) {
            return res.status(409).json({ error: "Room is already booked for the selected time" });
        }

        // Create a new booking
        const newBooking = new Booking({ 
            roomId, 
            userId, 
            date, 
            startTime, 
            endTime 
        });

        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { roomId, userId, date, startTime, endTime } = req.body;

        if (roomId) {
            const room = await Room.findById(roomId);
            if (!room) {
                return res.status(404).json({ error: "Room not found" });
            }
        }
        const overlappingBooking = await Booking.findOne({
            roomId,
            date,
            isActive: true,  
            _id: { $ne: id },
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },  
                { startTime: { $gte: startTime, $lt: endTime } },  
                { endTime: { $gt: startTime, $lte: endTime } }  
            ]
        });

        const updatedBooking = await Booking.findByIdAndUpdate(id, { roomId, userId, date, startTime, endTime }, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const expireOldBookings = async () => {
    console.log("Cron job running");
    try {
        const now = new Date();
        console.log("Cron job running at", now);
        const expiredBookings = await Booking.updateMany(
            { endTime: { $lt: now.toISOString() }, isActive: true },
            { $set: { isActive: false } }
        );
        console.log(`Expired ${expiredBookings.nModified} bookings`);
    } catch (error) {
        console.log("Error expiring old bookings:", error);
    }
};



module.exports = { createBooking, updateBooking ,expireOldBookings};
