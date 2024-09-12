import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import '../App.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await axios.post('http://localhost:8000/login', formData);
      } else {
        response = await axios.post('http://localhost:8000/register', formData);
      }
  
      console.log('Response:', response); // Log the entire response
  
      const { token, role } = response.data;
      console.log('Token:', token); // Log token to check if it's defined
      console.log('Role:', role);
  
      if (token && role) {
        dispatch(setToken({ token, role }));
        localStorage.setItem('authToken', response.data.token);
        // localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        toast.success(isLogin ? "Successfully logged in!" : "Successfully registered!");
  
        // Navigate based on role
        if (role === 'admin') {
          navigate('/create-room'); // Redirect admin to Create Room page after registration/login
        } else {
          navigate('/');
        }
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error) {
      console.log(error);
      if (isLogin && error.response && error.response.status === 404) {
        toast.error("User not found. Please register first.");
      } else if (!isLogin && error.response && error.response.status === 400) {
        toast.error("Registration failed. Please try again.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="auth-container">
      <ToastContainer />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Login;
