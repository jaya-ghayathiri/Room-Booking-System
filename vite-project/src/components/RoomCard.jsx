import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setRooms } from "../redux/roomSlice";
import '../style/RoomCard.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RoomCard = (props) => {
   
    const roomItems = useSelector((state) => state.room.items);
    const token = useSelector((state) => state.user.token);
    const role = useSelector((state) => state.user.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdd = () => {
        
        dispatch(setRooms([props.item]));
        navigate("/bookings");
    };
    const handleDelete = async () => {
        const roomId = props.item.id;
        try {
            await axios.delete(`http://localhost:8000/rooms/${roomId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Room deleted successfully!");
            // Optionally, remove the deleted room from the UI or reload the room list
        } catch (error) {
            console.error("Error deleting room:", error);
            toast.error("Error deleting room.");
        }
    };
    

    return (
        <div className="room-card">
            <img src={props.item.image} alt={props.item.name} />
            <h3>{props.item.name}</h3>
            <p>{props.item.location}</p>
            <div>Capacity: {props.item.capacity}</div>
            {/* <button className="button" onClick={handleAdd}>
                Book
            </button> */}
             {role === "admin" ? (
                <button className="button" onClick={handleDelete}>
                    Delete
                </button>
            ) : (
                <button className="button" onClick={handleAdd}>
                    Book
                </button>
            )}
        </div>
    );
};

export default RoomCard;


