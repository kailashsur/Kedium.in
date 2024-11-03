// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import tokenSlice, { fetchAccessToken } from "./slices/token.slice";




// creating store of retux
const store = configureStore({
    reducer : {
        
        User : userSlice,
        Token : tokenSlice,
        
        
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;