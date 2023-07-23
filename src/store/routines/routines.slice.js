import { createSlice } from "@reduxjs/toolkit";
import database from "../../constants/database";

const initialState = {...database.routines}

const routinesSlice = createSlice({
    name: "routines",
    initialState,
    reducers: {}
})

export default routinesSlice.reducer