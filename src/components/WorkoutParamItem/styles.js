import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 150,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 5,
        backgroundColor: colors.background.primary,
        position: 'relative',
        overflow: 'hidden',
    },
    controlsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: 10,
    },
    inputParamValue:{
        width: 120,
        height: 35,
        borderWidth: 2,
        borderColor: colors.background.secondary,
        borderRadius: 5,
        backgroundColor: colors.background.disabled,
        fontFamily: Fonts.LCD,
        textAlign: 'center',
        fontSize: 30,
        lineHeight: 33,
    },
    prevValueText:{
        color: colors.foreground.white,
        fontSize: 12,
        marginTop: 15
    },
    finishSetButton:{
        backgroundColor: colors.foreground.secondary,
        borderRadius: 0
    },
    badge:{
        width: 25,
        height: 25,
        backgroundColor: colors.foreground.secondary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: 15,
    },
    badgeCrown:{
        width: 25,
        height: 25,
        backgroundColor: colors.palette.princentonOrange,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: 55,
    },
    badgeIcon:{
        tintColor: colors.foreground.white,
        width: 20,
        height: 20,
    }

});