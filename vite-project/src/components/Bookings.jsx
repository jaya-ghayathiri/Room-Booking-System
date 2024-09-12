import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookings } from "../redux/roomSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../style/Booking.css"

const Bookings = () => {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const roomItems = useSelector((state) => state.room.items);
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (roomItems.length === 0) {
            toast.error("No room selected for booking.");
            return;
        }

        const bookingDetails = {
            roomId: roomItems[0]._id, 
            startTime,
            endTime,
            date
        };

        try {
            await axios.post('http://localhost:8000/bookings', bookingDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success("Booking confirmed!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: async () => {
                    
                    const response = await axios.get('http://localhost:8000/user-bookings', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    dispatch(setBookings(response.data));
                    navigate('/your-bookings');
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Room is already booked for the selected time.", {
                    
                });
            } else {
                toast.error("Failed to confirm booking.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Start Time:</label>
                    <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <button type="submit">Submit Booking</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Bookings;
