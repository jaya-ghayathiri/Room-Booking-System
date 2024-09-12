import { useSelector } from "react-redux";
import RoomCard from "../components/RoomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { setToken } from "../redux/userSlice";

const Rooms = (props) => {
    const token = useSelector((state)=>state.room.token);
    const roomItems = useSelector((state) => state.room.items) || []; 

    
    const [roomsList,setRoomsList] = useState([]);
    useEffect(()=>{
        getRooms();
    },[]);
    const getRooms = async() =>{
        const res = await axios.get("http://localhost:8000/getroom",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setRoomsList(res.data);
        // console.log(res.data)
    }

    return (
        <div className="room-container">
            {roomsList.map((item) =>
                <RoomCard key={item.id} item={item} setRoom={props.setRoom} />
            )}
        </div>
    );
};

export default Rooms;
