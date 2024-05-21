
import { createSlice } from '@reduxjs/toolkit';


const initialState = {data : {}}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },

  },
});

export const { addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;


