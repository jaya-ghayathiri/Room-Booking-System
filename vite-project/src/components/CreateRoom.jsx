import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import '../style/createroom.css'

const CreateRoom = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    image: '',
    capacity: '',
  });
  const [isEditing, setIsEditing] = useState(false);
 
  useEffect(() => {
    if (roomId) {
      // Fetch room details for editing
      // const token = localStorage.getItem('authToken');
      axios.get("http://localhost:8000/getroom", {
        headers: { Authorization: `Bearer ${token}` }
      })
      
        .then(response => {
          setFormData(response.data);
          setIsEditing(true);
        })
        .catch(error => {
          console.error('Error fetching room details:', error);
          toast.error('Error fetching room details.');
        });
    }
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    console.log(token); 
    if (!token) {
        toast.error('Authorization token is missing');
        return;
    }
    
    try {
        if (isEditing) {
            await axios.put(`http://localhost:8000/rooms/${roomId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Room updated successfully!');
        } else {
            await axios.post('http://localhost:8000/addroom', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Room created successfully!');
        }
        navigate('/');
    } catch (error) {
        console.error('Error saving room:', error);
        if (error.response && error.response.status === 401) {
            toast.error('Unauthorized: Please log in as an admin.');
        } else {
            toast.error('Error saving room.');
        }
    }
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
    <div className="room-form-container">
      <ToastContainer />
      <form className="room-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Room' : 'Create Room'}</h2>
        <div className="form-group">
          <label htmlFor="name">Room Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Room' : 'Create Room'}
        </button>
        {isEditing && (
          <button type="button" className="delete-button" onClick={handleDelete}>
            Delete Room
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateRoom;
