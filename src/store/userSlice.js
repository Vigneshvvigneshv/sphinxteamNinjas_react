import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:JSON.parse(localStorage.getItem('user'))||[]
}

const userSlice=createSlice({
    name:'userLogin',
    initialState,
    reducers:{
         addToUserLogin(state,action){
           state.user.push(action.payload.partyId);
            localStorage.setItem('user',JSON.stringify(state.user));
        },
        removeFromUserLogin(state,action){
            console.log("state.user:", state.user);
            console.log("removing:", action.payload);
            state.user=state.user.filter((partyId)=>partyId!==action.payload.partyId);
            localStorage.setItem('user',JSON.stringify(state.user));
        },
    },
});

export const userAction=userSlice.actions; 
export default userSlice;