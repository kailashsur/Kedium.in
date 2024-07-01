
import { decryptData, encryptData } from '@/util/encryptData';
import { createSlice } from '@reduxjs/toolkit';

const isClient = typeof window !== 'undefined';

const initialState = {
  data : {},
  info: isClient ? (localStorage.getItem('info') ? decryptData(localStorage.getItem('info')) : {}) : {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
    addInfo: (state, action) => {
      state.info = action.payload;
      if (isClient) {
        const encryptedInfo = encryptData(action.payload);
        if (encryptedInfo) {
          localStorage.setItem('info', encryptedInfo);
        } else {
          console.error('Failed to encrypt info before storing in localStorage');
        }
      }
    }
  },
});

export const { addUser, addInfo } = userSlice.actions;
export default userSlice.reducer;


