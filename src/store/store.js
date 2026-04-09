import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { themeReducer } from "../theme/theme";
import themeSlice from "./themeSlice";





const store=configureStore({
    reducer:{
        userReducer:userSlice.reducer,
       
    }
});


export default store;