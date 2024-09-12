import Header from "./components/Header";

import Home from "./components/Home";
import Rooms from "./components/Rooms";
import RoomCard from "./components/RoomCard";
import Bookings from "./components/Bookings";
import YourBookings from "./components/YourBookings";
import RoomForm from "./components/RoomForm";
import CreateRoom from "./components/CreateRoom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ToastContainer/>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Rooms />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path='/bookings' element={<Bookings />} />
          <Route path='/your-bookings' element={<YourBookings />} />
          <Route path='/room-management' element={<RoomForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
