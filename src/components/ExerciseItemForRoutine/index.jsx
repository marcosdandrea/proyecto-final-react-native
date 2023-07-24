import { View } from "react-native"
import styles from "./styles"
import CustomText from "../CustomText"

const ExerciseItemForRoutine = ({item}) => {
    return (
    <View style={styles.container}>
        <View>
        <CustomText text={item.name} style={styles.exerciseName}/>
        <View style={styles.setContainer}>
            <CustomText text={"Sets:"} style={styles.text}/>
        {
            item.sets.map((set, index)=> <CustomText key={index} text={set} style={styles.text}/>)
        }
        </View>
        </View>
    </View>
    )
}

export default ExerciseItemForRoutine