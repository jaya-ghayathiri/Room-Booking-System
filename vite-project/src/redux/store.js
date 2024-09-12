import { configureStore } from "@reduxjs/toolkit";

import roomSlice from "./roomSlice";
import userSlice from "./userSlice";

const store=configureStore({
    reducer:{
        room:roomSlice,
        user:userSlice
    },
});

export default store;