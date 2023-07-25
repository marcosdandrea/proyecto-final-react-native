import { createSlice } from "@reduxjs/toolkit";
import database from "../../constants/database";

import {
  addExerciseService,
  removeExerciseService,
  saveExerciseService,
} from "./exercises.services";

const initialState = { ...database.exercises };

const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: addExerciseService,
    removeExercise: removeExerciseService,
    saveExercise: saveExerciseService,
  },
});

export const { addExercise, removeExercise, saveExercise } =
  exercisesSlice.actions;
export default exercisesSlice.reducer;
