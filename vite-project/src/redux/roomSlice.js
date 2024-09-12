import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    bookings: []
};

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.items = action.payload;
        },
        setBookings: (state, action) => {
        
            state.bookings = action.payload;
        }
    },
});

export const { setRooms, setBookings } = roomSlice.actions;

export default roomSlice.reducer;
