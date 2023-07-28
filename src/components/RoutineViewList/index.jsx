import { FlatList, Text, View } from "react-native";
import { useEffect, useState } from "react"
import styles from "./style"
import { useSelector } from "react-redux";
import { ExerciseItemForRoutine } from "..";
import DraggableFlatList from 'react-native-draggable-flatlist';

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
        <DraggableFlatList
            contentContainerStyle={styles.exerciseList}
            onDragEnd={({data}) => console.log(data)}
            data={currentExerciseList}
            keyExtractor={(item)=>item.key}
            renderItem={ExerciseItemForRoutine}
        />
    </View> 
    );
}
 
export default RoutineViewList;