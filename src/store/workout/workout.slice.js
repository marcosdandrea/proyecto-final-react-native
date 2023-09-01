import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workout:{},
  setsLeft:0,
  savingState:0,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setWorkout: (state, action) => {
      state.workout = action.payload;
    },
    setSetsLeft: (state, action) => {
      state.setsLeft = action.payload;
    },
    completeSet: (state, action) => {
      const {currentExercise, currentSet, currentSetWeight} = action.payload;
      let _currentExercise = state.workout.routine.exercises.find(ex => ex.exerciseID == currentExercise)
      if (!_currentExercise.completedSets) _currentExercise.completedSets = []
      _currentExercise.completedSets[currentSet-1] = currentSetWeight;
    },
    savingState: (state, action) => {
      state.savingState = action.payload
    }
  },
});

export const { setWorkout, setSetsLeft, completeSet, savingState } = workoutSlice.actions;

export default workoutSlice.reducer;