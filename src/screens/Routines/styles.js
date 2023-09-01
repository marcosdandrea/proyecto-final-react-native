import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../theme";

const generalWidth = 45;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingTop: 10,
    justifyContent: "center",
    position: "relative"
  },
  routineMainContianer: {
    flex: 1,
    paddingBottom: 20,
  },
  searchBox: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  horizontalGallery: {
    height: 0,
  },
  horizontalGalleryContent: {},
  routineContainer: {
    flex: 1,
    paddingVertical: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 30,
    width: "100%",
  },
  routines: {
    width: "100%",
    //width: Dimensions.get("window").width - 45,
    borderRadius: 5,
    paddingBottom: 5,
  },
  exerciseList: {
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  newExerciseItem: {
    width: Dimensions.get("window").width - 45,
    height: 60,
    borderRadius: 5,
    backgroundColor: colors.background.terciary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5
  },
  newExerciseText: {
    color: colors.foreground.white
  },
  deleteIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noRoutinesContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 50
  },
  noRoutineText:{
    color: colors.foreground.white,
    textAlign: "center"
  }
});
