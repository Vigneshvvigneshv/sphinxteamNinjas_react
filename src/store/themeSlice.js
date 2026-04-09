import { createSlice } from "@reduxjs/toolkit";
import { sphinxTheme } from "../theme/sphinxTheme";

const themeSlice=createSlice({
    name:'theme',
    initialState:{theme:sphinxTheme},
    reducers:{},
});

export default themeSlice;