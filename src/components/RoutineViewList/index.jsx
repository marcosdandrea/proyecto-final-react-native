import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react"
import styles from "./style"
import { useSelector } from "react-redux";
import { ExerciseItemForRoutine } from "..";

const RoutineViewList = ({currentRoutine, navigation}) => {
    const [ currentExerciseList, setCurrentExerciseList] = useState([])
    const _exercises = useSelector((state)=> state.exercises)

    useEffect(()=>{
        if (!currentRoutine) return
        setCurrentExerciseList(()=> {
            return Object.keys(currentRoutine).map(key => {
                const exerciseData = _exercises.items[key]
                return ({...currentRoutine[key], key, name: exerciseData.name})
            })
        })
    }, [currentRoutine])

    return ( 
    <View style={styles.container}> 
        <FlatList
            contentContainerStyle={styles.exerciseList}
            data={currentExerciseList}
            keyExtractor={(item)=>item.key}
            renderItem={({item})=><ExerciseItemForRoutine item={item} navigation={navigation}/>}
        />
    </View> 
    );
}
 
export default RoutineViewList;