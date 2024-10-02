// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import pathSlice from "./slices/pathSlice";



// creating store of retux
const store = configureStore({
    reducer : {
        Auth : authSlice,
        User : userSlice,
        Path : pathSlice,
    }
});

export default store;