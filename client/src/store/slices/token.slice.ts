

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


export interface TokenState {
    accessToken: string;
    refreshToken: string;
    data: any;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: any;
}

// Initial state
const initialState: TokenState = {
    accessToken: "",
    refreshToken: "",
    data: {},
    status: "idle", // idle | loading | succeeded | failed
    error: null
};

export const fetchAccessToken = createAsyncThunk(
    "token/fetchAccessToken",
    async () => {
        const { data: { accessToken } } = await axios.get('/api/getAccessToken');
        const { data: { refreshToken } } = await axios.get('/api/getRefreshToken');
        const { data: { data } } = await axios.get(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/login-with-access-token`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return { accessToken, refreshToken, data: data };
    }
);




const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        resetState: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            state.data = {};
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccessToken.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAccessToken.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.data = action.payload.data;
            })
            .addCase(fetchAccessToken.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
            })
            

    },
});

export const { resetState } = tokenSlice.actions;
export default tokenSlice.reducer;