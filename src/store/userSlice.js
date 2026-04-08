import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:JSON.parse(localStorage.getItem('user'))||[],
    role:JSON.parse(localStorage.getItem('role'))||[]
}

const userSlice=createSlice({
    name:'userLogin',
    initialState,
    reducers:{
         addToUserLogin(state,action){
            //first remove the existing user;
                state.user=[];
                localStorage.setItem('user',JSON.stringify(state.user));
                state.role=[];
                localStorage.setItem('role',JSON.stringify(state.role));

                state.user.push(action.payload.partyId);
                state.role.push(action.payload.role);
                localStorage.setItem('user',JSON.stringify(state.user));
                localStorage.setItem('role',JSON.stringify(state.role));
        },
        removeFromUserLogin(state,action){
            state.user=state.user.filter((partyId)=>partyId!==action.payload.partyId);
            state.role=state.role.filter((role)=>role!==action.payload.role);
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('role',JSON.stringify(state.role));
        },
    },
});

export const userAction=userSlice.actions; 
export default userSlice;