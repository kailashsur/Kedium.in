import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PathState{
    toGoPath : string;
}

const initialState : PathState = {
    toGoPath : '/'
}

const pathSlice = createSlice({
    name : 'path',
    initialState,
    
    reducers : {

        setPrevPath : (state, action : PayloadAction<string>)=>{
            state.toGoPath = action.payload || '/';
        }
    }
});

export const {setPrevPath} = pathSlice.actions;
export default pathSlice.reducer;