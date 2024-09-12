import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setBookings } from "../redux/roomSlice"; 
import '../style/YourBookings.css'
const YourBookings = () => {
    const dispatch = useDispatch();
    const bookings = useSelector((state) => state.room.bookings);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        if (token) {
            getBookings();
            console.log(token)
        }
        
    }, []);

    const getBookings = async () => {
        try {
            const res = await axios.get('http://localhost:8000/user-bookings', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Fetched bookings:", res.data);
            dispatch(setBookings(res.data));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="booking-container">
            {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                    <div key={index} className="booking-card">
                        <h3>Booking #{index + 1}</h3>

                        {booking.roomId ? (
                            <>
                                <img src={booking.roomId.image} alt="Room" />
                                <p>Room: {booking.roomId.name}</p>
                                <p>Location: {booking.roomId.location}</p>
                                <p>Capacity: {booking.roomId.capacity}</p>
                                <p>Date: {booking.date}</p>
                                <p>Start Time: {booking.startTime}</p>
                                <p>End Time: {booking.endTime}</p>
                            </>
                        ) : (
                            <p>Room details are missing.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No bookings yet.</p>
            )}
        </div>
    );
};

export default YourBookings;
