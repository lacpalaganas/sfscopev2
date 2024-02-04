import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    width: "50%", // is 50% of container width
    padding: SIZES.small,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemContentSubHeader: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  itemContent: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  itemContentList: {
    marginTop: 0,
    fontSize: 14,
    color: "#666",
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,

    borderColor: COLORS.gray2,
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.small / 2,
    width: "100%",
    marginTop: 0,
    paddingHorizontal: SIZES.medium,
  },
  tab: (activeTab, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: activeTab === item ? COLORS.secondary : COLORS.gray2,
    marginBottom: SIZES.small / 2,
  }),
  tabText: (activeTab, item) => ({
    color: activeTab === item ? COLORS.secondary : COLORS.gray2,
  }),
  image: {
    flex: 1,
    width: "100%",
    height: 200,
    resizeMode: "contain",
    borderRadius: 5,
    margin: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  viewCenter: {
    height: "100%",
    alignItems: "center",
    marginTop: "30%",
  },
  button: {
    width: "90%",
    padding: 18,
    backgroundColor: COLORS.primary,
    marginTop: 10,
    borderRadius: SIZES.small / 2,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
  },
});

export default styles;
