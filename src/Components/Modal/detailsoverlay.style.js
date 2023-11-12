
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
const styles = StyleSheet.create({
    modalContent: {
      height: '85%',
      width: '100%',
      backgroundColor: COLORS.lightWhite,
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '5%',
      backgroundColor: COLORS.gray,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    itemContentSubHeader: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
    },
    itemContainer: {
        marginBottom: 15,
        padding: 15,
       // backgroundColor: "white",
        borderRadius: 10,
        elevation: 3,
    },
  });
 
  export default styles