
import { createSlice } from '@reduxjs/toolkit';



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    visible: false,
    state : "signup", // or "login"
    step : 1, // or 2
    
  },
  reducers: {

    enable : (state, action) =>{
      state.visible = true;
      state.state = action.payload || "signup"; // Set state to payload if provided, otherwise default to "signup"
    },
    disable : (state)=> {
      state.visible = false; 
      state.state = "signup"; // Reset state to "signup" when disabling
    },

    updateStep : (state, action) => {
      state.step = action.payload;
    },

    updateState : (state, action) => {
      state.state = action.payload;
    },

  },
});

export const { enable, disable, updateStep, updateState } = authSlice.actions;
export default authSlice.reducer;


