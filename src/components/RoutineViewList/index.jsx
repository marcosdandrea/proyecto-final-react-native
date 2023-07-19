import { FlatList, View } from "react-native";
import { useContext, useEffect, useState } from "react"
import DatabaseContext from "../../contexts/DatabaseContext";
import ExerciseItem from "../ExerciseItem";
import styles from "./style"

const RoutineViewList = ({exercisesData}) => {
    const { exercises } = useContext(DatabaseContext)
    const [ currentExerciseList, setCurrentExerciseList] = useState([])

    useEffect(()=>{
        if (exercisesData==undefined) return
        setCurrentExerciseList(()=> {
            return Object.keys(exercisesData).map(key => {
                const exerciseData = exercises.find(ex => ex.key == key)
                return ({...exercisesData[key], name: exerciseData.name, category: exerciseData.category})
            })
        })
    }, [exercisesData])



    return ( 
    <View style={styles.container}> 
        <FlatList
            data={currentExerciseList}
            contentContainerStyle={styles.exerciseList}
            renderItem={({item})=><ExerciseItem item={item}/>}
        />
    </View> 
    );
}
 
export default RoutineViewList;