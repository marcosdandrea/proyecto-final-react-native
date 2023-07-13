import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native"
import colors from "../../theme/colors"
import CustomText from "../CustomText/CustomText"

const FilterElement = ({label, onPress, selected}) => {

    const styles = StyleSheet.create({
        container: {
            height: 25,
            borderRadius: 10,
            backgroundColor: selected == label ? colors.foreground.secondary : colors.foreground.primary,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 5,
        },
        text:{
            lineHeight: 20,
            paddingHorizontal: 15,
            color: colors.foreground.white

        }
    })

    const handleOnPress = () => {
        onPress(selected == label ? "" : label)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleOnPress}>
                <CustomText text={label} style={styles.text}/>
            </TouchableOpacity>
        </View>
    )
}

const Filters = ({filterList, onPress, selected}) => {

    const styles = StyleSheet.create({
        container:{
            paddingHorizontal: 20,
            flexDirection: "row",
            columnGap: 5,
            gap: 5,
        }
    })

    return ( 
    <View >
        <FlatList 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
            renderItem={({item})=> 
                <FilterElement 
                label={item} 
                onPress={onPress}
                selected={selected}/>}
            data={filterList}/>

    </View> 
    );
}
 
export default Filters;