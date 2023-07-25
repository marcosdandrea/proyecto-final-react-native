import uuid from "react-native-uuid";

const removeExerciseService = (state, action) => {
    let key = action.payload.key
    delete state.items[key]
}

const saveExerciseService = (state, action) => {
    let exercise = action.payload
    let key = exercise.key
    delete exercise.key 
    state.items[key] = {...exercise}   
}

const addExerciseService = (state, action) => {
    let exercise = action.payload
    delete exercise.key
    const key = uuid.v4()
    state.items[key] = {...exercise}
}



export { removeExerciseService, saveExerciseService, addExerciseService }