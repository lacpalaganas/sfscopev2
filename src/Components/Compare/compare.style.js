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
    borderColor: COLORS.gray2,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitle: {
    fontSize: 16,
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
    borderWidth: activeTab === item ? 2 : 1,
    borderColor: activeTab === item ? COLORS.secondary : COLORS.gray2,
    marginBottom: SIZES.small / 2,
  }),
  tabText: (activeTab, item) => ({
    color: activeTab === item ? COLORS.secondary : COLORS.gray2,
    fontWeight: activeTab === item ? 800 : 300,
  }),
});

export default styles;
