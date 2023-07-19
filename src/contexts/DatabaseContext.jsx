import { createContext, useEffect, useState } from "react";
const DatabaseContext = createContext();
import DB from "../constants/database";

const DatabaseContextProvider = ({ children }) => {
    const [database, setDatabase ] = useState(DB)
    const [exercises, setExercises] = useState([])
    const [categories, setCategories] = useState([])
    const [routines, setRoutines] = useState([])

    useEffect(()=>{
        console.log ("Exercises has been updated")
        const allExercises = Object.keys(database.exercises).map(key => {return {...database.exercises[key], key}})
        setExercises(allExercises)

        const allCategories = Object.keys(database.exercises).map(key => database.exercises[key].category)
        const categorySet = Array.from(new Set(allCategories))
        setCategories(categorySet)

        const allRoutines = Object.keys(database.routines).map(key => {return {...database.routines[key], key}})
        setRoutines (allRoutines)
    },[database])

    const getSingleExercise = (exerciseID) => {
        return (database.exercises[exerciseID])
    }

    const saveExercise = ({exerciseID, data}) => {
        if (exerciseID){
            console.log("Saving", exerciseID )
            setDatabase(prev => {
                const newData = {...prev}
                newData.exercises[exerciseID] = data
                return newData
            })
            return
        }
        console.log ("Creating exercise")
        setDatabase(prev => {
            const newData = {...prev}
            const exerciseID = crypto.randomUUID()
            newData.exercises[exerciseID] = {...data}
            return newData
        })
    }

    const deleteExercise = ({exerciseID}) => {
        console.log ("Deleting Exercise", exerciseID)
        setDatabase(prev => {
            const newData = {...prev}
            delete newData.exercises[exerciseID]
            return newData
        })
    }

    return (
    <DatabaseContext.Provider value={
        {   
            exercises,
            categories, 
            routines,
            getSingleExercise,
            saveExercise,
            deleteExercise
        }}>
        {children}
    </DatabaseContext.Provider>
    );
};

export default DatabaseContext
export { DatabaseContextProvider }
