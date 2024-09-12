import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RoomForm = () => {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.isAdmin || localStorage.getItem("role") === 'admin');

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    image: ''
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');  // Redirect to home if not admin
    }
    fetchRooms();
  }, [isAdmin]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/rooms', formData);
      toast.success('Room created successfully!');
      fetchRooms();
      setFormData({ name: '', location: '', capacity: '', image: '' });
    } catch (error) {
      console.error('Error creating room:', error);
      toast.error('Failed to create room');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/rooms/${id}`);
      toast.success('Room deleted successfully!');
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
    }
  };

  return (
    <div>
      <h1>Room Management</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Room</button>
      </form>

      <h2>Existing Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - {room.location} - {room.capacity}
            <button onClick={() => handleDelete(room.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default RoomForm;
