const removeExerciseService = (state, action) => {
    let key = action.payload.key
    delete state[key]
}

const saveExerciseService = (state, action) => {
    let exercise = action.payload
    let key = exercise.key
    delete exercise.key 
    state[key] = {...exercise}   
}



export { removeExerciseService, saveExerciseService }