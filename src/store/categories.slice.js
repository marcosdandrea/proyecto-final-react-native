import { createSlice } from "@reduxjs/toolkit";
import database from "../constants/database";

const extractCategories = ({database}) => {
    const allCategories = Object.keys(database.exercises).map(key => database.exercises[key].category)
    return (Array.from(new Set(allCategories)))
}

const initialState = extractCategories({database})

const categoriesSlice = createSlice ({
    name: "categories",
    initialState,
    reducers: {}
})

export default categoriesSlice.reducer