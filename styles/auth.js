import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT } from "../constants";

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.white,
    marginTop: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.xxLarge,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.warning,
    height: 50,
    width: "90%",
    maxWidth: 300
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
    backgroundColor: COLORS.danger,
    borderRadius: 100,
    borderColor: COLORS.warning,
    borderWidth: 2,
    borderStyle: "solid",
    marginTop: 20,
    height: 50,
    width: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: COLORS.warning,
    fontFamily: FONT.cute,
    fontSize: 30
  }
})

export default styles;