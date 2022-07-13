import {createSlice} from '@reduxjs/toolkit';
export const authSlice=createSlice({
    name:'authSlice',
    initialState:{value:null},
    reducers:{
        adminLogin:(state,action)=>{
            localStorage.setItem('auths',JSON.stringify(action.payload))
            return {...state,value:action.payload};
        }
    }
})
export const {adminLogin} = authSlice.actions;
export default authSlice.reducer;