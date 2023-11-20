import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../../constants";

const styles = (theme) => StyleSheet.create({
  container: {
    width: "100%",
  },
  controlContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    marginTop: SIZES.large,
  },
  controlWrapper: {
    backgroundColor: theme.input,
    marginTop: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xxLarge,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.primary,
    height: 50,
    width: "90%",
    maxWidth: 400
  },
  controlInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    borderRadius: SIZES.xxLarge,
  },
  controlButton: {
    backgroundColor: theme.tertiary,
    borderRadius: 100,
    borderColor: theme.primary,
    borderWidth: 2,
    borderStyle: "solid",
    marginTop: 20,
    height: 50,
    width: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  controlButtonText: {
    color: theme.primary,
    fontFamily: FONT.cute,
    fontSize: 30
  },
  errorText: {
    color: COLORS.red,
    fontFamily: FONT.regular,
    fontSize: 16,
    textAlign: "center"
  }
})

export default styles;