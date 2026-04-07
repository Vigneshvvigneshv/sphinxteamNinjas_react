import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { ThemeSlice } from "./ThemeSlice";



const store=configureStore({
    reducer:{
        cartReducer:cartSlice.reducer,
        themeReducer:ThemeSlice.reducer,
    }
});


export default store;