
import { createSlice } from '@reduxjs/toolkit';



const pathSlice = createSlice({
  name: 'path',
  initialState: {
    toGoPath : "/"    
  },
  reducers: {

    setPrevPath : (state, action) =>{
      state.toGoPath = action.payload || "/"; // Set state to payload if provided, otherwise default to "signup"
    },
    

  },
});

export const { setPrevPath } = pathSlice.actions;
export default pathSlice.reducer;


