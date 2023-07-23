import { FlatList, View } from "react-native";
import { useEffect, useState } from "react"
import ExerciseItem from "../ExerciseItem";
import styles from "./style"
import { useSelector } from "react-redux";

const RoutineViewList = ({exercisesData, navigation}) => {
    const [ currentExerciseList, setCurrentExerciseList] = useState([])
    const _exercises = useSelector((state)=> state.exercises)
    const [exercises, setExercises] = useState()
  
    useEffect(()=>{
        const allExercises = Object.keys(_exercises).map(key => {return {..._exercises[key], key}})
        setExercises(allExercises)
      }, [_exercises])

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
            renderItem={({item})=><ExerciseItem item={item} navigation={navigation}/>}
        />
    </View> 
    );
}
 
export default RoutineViewList;