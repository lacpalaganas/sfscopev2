import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./detailsoverlay.style";
export default function ViewDetailsOverlay({
  isVisible,
  item,
  onClose,
  rentals,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>About this neighborhood</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        <ScrollView style={styles.itemContainer}>
          <Text style={[styles.itemContentSubHeader, { fontSize: 24 }]}>
            {item.nhood}
          </Text>
          <Text style={styles.itemContentSubHeader}>Walk Score</Text>
          <Text style={styles.itemContent}>{item.walk}</Text>
          <Text style={styles.itemContentSubHeader}>Bike Score</Text>
          <Text style={styles.itemContent}>{item.bike}</Text>
          <Text style={styles.itemContentSubHeader}>Transit Score</Text>
          <Text style={styles.itemContent}>{item.transit}</Text>
          <Text style={styles.itemContentSubHeader}>Median Rent</Text>
          <Text style={styles.itemContent}>{item.rent}</Text>
          <Text style={styles.itemContentSubHeader}>
            List of Rentals (scroll horizontally)
          </Text>
          {rentals.length != 0 ? (
            <>
              <FlatList
                showsHorizontalScrollIndicator
                persistentScrollbar
                data={rentals}
                horizontal
                renderItem={({ item }) => (
                  <View style={{ marginRight: 20 }}>
                    <View style={{ paddingTop: 10 }}></View>
                    <Text>{`Title: ${item.title1}`}</Text>
                    <Text>{`Contact: ${item.contact}`}</Text>
                    <Text>{`Price: ${item.price}`}</Text>
                    <Text>{`Rent period: ${item.rentPeriod}`}</Text>
                    <Text>{`Bedrooms: ${item.bedrooms}`}</Text>
                    <Text>{`Bathrooms: ${item.bathrooms}`}</Text>
                    <Text>{`Pets: ${item.pets}`}</Text>
                    <Text>{`Furnished: ${item.furnished}`}</Text>
                    <Text>{`Wheelchair: ${item.wheelchair}`}</Text>
                    <Text>{`Airconditioning: ${item.airconditioning}`}</Text>
                    <Text>{`Parking: ${item.parking}`}</Text>

                    <View style={{ paddingBottom: 20 }}></View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </>
          ) : (
            <Text>No available rentals</Text>
          )}

          <Text style={styles.itemContentSubHeader}>Travel to Downtown</Text>
          <Text style={styles.itemContent}>{item.ttd}</Text>
          <Text style={styles.itemContentSubHeader}>Zipcodes</Text>
          <Text style={styles.itemContent}>
            {item.zipCodes.map((item, index) => (
              <Text style={styles.pointText}>{`${item}, `}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Description</Text>
          <Text style={styles.itemContent}>{item.desc}</Text>
          <Text style={styles.itemContentSubHeader}>Arts</Text>
          <Text style={styles.itemContent}>
            {item.arts.map((item, index) => (
              <Text style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Restaurants</Text>
          <Text style={styles.itemContent}>
            {item.restaurants.map((item, index) => (
              <Text style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Groceries</Text>
          <Text style={styles.itemContent}>
            {item.groceries.map((item, index) => (
              <Text style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Cafes</Text>
          <Text style={styles.itemContent}>
            {item.cafes.map((item, index) => (
              <Text style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Shopping</Text>
          <Text style={styles.itemContent}>
            {item.shopping.map((item, index) => (
              <Text style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Night life</Text>
          <Text style={styles.itemContent}>
            {item.nightLife.map((item, index) => (
              <Text style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
        </ScrollView>
      </View>
    </Modal>
  );
}
