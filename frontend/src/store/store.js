// store.js

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import pathSlice from "./slices/pathSlice";

const store = configureStore(
    {
        reducer : {
            Auth : authSlice,
            User : userSlice,
            Path : pathSlice,
        }
    }
)
export default store;


