const stylesFn = (theme) => ({
  container: {
    flex: 1,
  },
  headerBar: {
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%", 
    backgroundColor: theme.primary
  },
  headerText: {
    fontSize: 38,
    color: theme.background
  },
  paletteContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    marginVertical: 4
  },
  paletteTitleBlock: {
    backgroundColor: theme.primary,
    paddingHorizontal: 10
  },
  paletteTitleBlockLeft: {
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderTopWidth: 15,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: theme.primary,
    width: 20,
    height: "100%"
  },
  paletteTitleBlockRight: {
    borderLeftWidth: 15,
    borderLeftColor: theme.primary,
    borderTopWidth: 15,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderBottomWidth: 15
  },
  paletteTitleText: {
    textTransform: "capitalize",
    fontSize: 32,
    color: theme.tertiary
  },
  paletteTitleStrikethrough: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    zIndex: -1
  },
  paletteTitleStrikethroughOuter: {
    height: 3,
    width: "100%",
    backgroundColor: theme.primary
  },
  paletteTitleStrikethroughInner: {
    height: 3,
    width: "100%",
    backgroundColor: theme.secondary
  },
  paletteColorContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  colorSelect: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 20,
    margin: 5
  }
})

export default stylesFn;