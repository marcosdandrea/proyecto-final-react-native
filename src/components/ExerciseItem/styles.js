import { StyleSheet } from "react-native";
import { colors } from "../../theme";

export default styles = StyleSheet.create({
  container: {
    backgroundColor: colors.foreground.black,
    padding: 5,
    flexDirection: "column",
    alignItems: "center",
    height: 75,
  },
  categoryContainer: {
    position: "absolute",
    marginTop: 8,
    marginLeft: 15,
    height: 20,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: colors.foreground.terciary,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.foreground.white,
  },
  mainBody: {
    paddingLeft: 15,
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
  nameText: {
    marginTop: 32,
    color: colors.foreground.white,
    fontSize: 16,
  },

  decoration: {
    height: 3,
    width: "105%",
    position: "absolute",
    bottom: -5,
    backgroundColor: colors.foreground.terciary,
  },
});
