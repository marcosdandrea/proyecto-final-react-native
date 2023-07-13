import { createContext } from "react";
const DatabaseContext = createContext();

import database from "../constants/database";

const DatabaseContextProvider = ({ children }) => {

    const getCategories = () =>{
        const allCategories = Object.keys(database.exercises).map(key => database.exercises[key].category)
        const categorySet = Array.from(new Set(allCategories))
        return (categorySet)
    }

    const getExercises = () => {
        const allExercises = Object.keys(database.exercises).map(key => database.exercises[key])
        return allExercises
    }


    return (
    <DatabaseContext.Provider value={{getCategories, getExercises}}>
        {children}
    </DatabaseContext.Provider>
    );
};

export default DatabaseContext
export { DatabaseContextProvider }
