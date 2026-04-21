import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partyId: null,
  role: null,
  
};

const userSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    addToUserLogin(state, action) {
      state.partyId = action.payload.partyId;
      state.role = action.payload.role;
     
    },
    removeFromUserLogin(state) {
      state.partyId = null;
      state.role = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
