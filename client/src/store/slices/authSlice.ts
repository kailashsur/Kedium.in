import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the shape of the state
export interface AuthState{
    visible : boolean;
    state : 'signup' | 'login';
    step : number;
}

// Define the initial state using the AuthState interface
const initialState : AuthState = {
    visible : false,
    state : 'signup',
    step : 1,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        enable : (state, action : PayloadAction<'signup' | 'login'>) =>{
            state.visible = true;
            state.state = action.payload || 'signup';
        },
        disable : (state)=>{
            state.visible = false;
            state.state = "signup";
        },
        updateStep : (state, action : PayloadAction<number>) =>{
            state.step = action.payload;
        },
        updateState : (state, action : PayloadAction<'signup' | 'login'>)=>{
            state.state = action.payload;
        }
    }
})

export const { enable, disable, updateStep, updateState} = authSlice.actions;
export default authSlice.reducer;