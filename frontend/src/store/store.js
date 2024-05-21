// store.js

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";

const store = configureStore(
    {
        reducer : {
            Auth : authSlice,
            User : userSlice,
        }
    }
)
export default store;


