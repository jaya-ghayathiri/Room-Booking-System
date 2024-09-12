import React from 'react';
import '../style/Header.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../redux/userSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, role } = useSelector((state) => state.user);

    const handleRemove = () => {
        dispatch(removeToken());
        navigate('/login');
    };

    return (
        <div className="App">
            <div className="navbar">
                <div className="navbar-left">
                    <Link to="/">Home</Link>
                </div>
                <div className="navbar-right">
                    <Link to="/">Rooms</Link>
                    {role !== 'admin' && <Link to="/bookings">Bookings</Link>}
                    {role === 'admin' ? (
                        <Link to="/create-room">Create Room</Link>
                    ) : (
                        <Link to="/your-bookings">Your Bookings</Link>
                    )}
                    {token ? (
                        <>
                            <span>{role === 'admin' ? 'Admin' : 'User'}</span>
                            <span onClick={handleRemove} style={{ cursor: 'pointer' }}>Logout</span>
                        </>
                    ) : (
                        <Link to='/login'>Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
