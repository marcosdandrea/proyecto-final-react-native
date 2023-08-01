import { StyleSheet } from "react-native";
import { colors } from "../../theme";
import { Fonts } from "../../../assets/fonts/FontProvider";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000aa"
  },
  modal: {
    width: "80%",
    height: "70%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: colors.background.secondary,
    zIndex: -1
  },
  header:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: colors.foreground.white,
    textTransform: "uppercase",
    textAlign: "center",
  },
  list: {
    marginTop: 15,
    width: "100%",
    marginBottom: 5,
  },
  listContainer: {
    gap: 8,
  },
  itemGroupFlatList: {
    flex: 1,
    height: "100%",
  },
  menuBar: {
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 20,
    padding: 10,
    backgroundColor: colors.background.terciary,
    marginTop: 10,
  },
  setGroup: {
    container: {
      height: 60,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: colors.background.terciary,
      borderRadius: 5,
      zIndex: -3
    },
    repsContainer: {
      flex: 1,
      marginRight: 35,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      columnGap: 20,
    },
    setLabelContainer: {
      height: "100%",
      width: "30%",
      position: "absolute",
      opacity: 0.05,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    setLabel: {
      color: colors.foreground.white,
      fontFamily: Fonts.Bold,
      fontSize: 110,
      marginLeft: -10,
      marginTop: -45,
    },
    texts: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: 70
    },
    label: {
      color: colors.foreground.informative,
    },
    labelItem: {
      fontFamily: Fonts.Bold,
      color: colors.foreground.white,
      fontSize: 20,
    },
    button: {
      width: 25,
      height: 25,
    },
    exerciseNotes:{
      width: "70%",
      height: 50,
      backgroundColor: colors.background.primary,
      color: colors.foreground.white,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: Fonts.Regular,
      fontSize: 14,
      borderRadius: 5,
      padding:5
    },
    notesIcon:{
      width: 20,
      height: 20,
      tintColor: colors.foreground.white,
    }
  },
  deleteButton: {
    backgroundColor: colors.foreground.warning,
    width: 35,
    height: "100%",
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  },
  deleteIcon: {
    width: 22,
    height: 22,
    tintColor: colors.background.terciary,
  },
  newSetButton:{
    width: "100%",
    height: 40,
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.foreground.secondary,
    marginBottom: 10,
  },
  newSetButtonText:{
    color: colors.foreground.white,
    fontFamily: Fonts.Bold,
    fontSize: 14,
  },
  removeButton:{
    width: "100%",
    height: 40,
    flexDirection: "row",
    columnGap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors.foreground.primary,
  },
  newSetIcon:{
    width: 20,
    height: 20,
    tintColor: colors.foreground.white,
  }
});
