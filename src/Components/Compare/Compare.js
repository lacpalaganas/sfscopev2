import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Icon,
  Linking,
} from "react-native";
import { COLORS, icons, SIZES, FONT } from "../../../constants";
import { FlatList } from "react-native-gesture-handler";
import useFetch from "../../../hook/useFetch";
import styles from "./compare.style";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ViewDetailsOverlay from "../Modal/ViewDetailsOverlay";

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [nhoodDetails, setNhoodDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setNhoodDetails(item);
    console.log(nhoodDetails);
  }, []);
  return (
    <ScrollView style={styles.itemContainer}>
      <Text
        style={{ color: "blue", fontSize: 15, marginTop: 6, fontWeight: 600 }}
        onPress={() => Linking.openURL(`${item.webLink}`)}
      >
        Link: {item.nhood}
      </Text>
      <Text style={styles.itemContentSubHeader}>Walk Score</Text>
      <Text style={styles.itemContent}>{item.walk}</Text>
      <Text style={styles.itemContentSubHeader}>Bike Score</Text>
      <Text style={styles.itemContent}>{item.bike}</Text>
      <Text style={styles.itemContentSubHeader}>Transit Score</Text>
      <Text style={styles.itemContent}>{item.transit}</Text>
      <Text style={styles.itemContentSubHeader}>Median Rent</Text>
      <Text
        style={{ marginTop: 10, fontSize: 14, color: "blue" }}
        onPress={() =>
          //Linking.openURL(`https://sfbay.craigslist.org/search/sfc/apa?query=${item.nhood}`)}
          navigation.navigate("View Rentals", {
            nhood: item.nhood,
            previousScreen: "SFScope",
          })
        }
      >
        {item.rent}
      </Text>
      <Text style={styles.itemContentSubHeader}>Travel to Downtown</Text>
      <Text style={styles.itemContent}>{item.ttd}</Text>
      <Text style={styles.itemContentSubHeader}>Zipcodes</Text>
      <Text style={styles.itemContent}>
        {item.zipCodes.length != 0 ? (
          item.zipCodes.map((items, index) => (
            <Text key={index} style={styles.pointText}>{`${items}, `}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text style={styles.itemContentSubHeader}>Description</Text>
      <Text style={styles.itemContent}>{item.desc}</Text>
      <Text style={styles.itemContentSubHeader}>Arts</Text>
      <Text style={styles.itemContent}>
        {item.arts.length != 0 ? (
          item.arts.map((item, index) => (
            <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text style={styles.itemContentSubHeader}>Restaurants</Text>
      <Text style={styles.itemContent}>
        {item.restaurants.length != 0 ? (
          item.restaurants.map((item, index) => (
            <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text style={styles.itemContentSubHeader}>Groceries</Text>
      <Text style={styles.itemContent}>
        {item.groceries.length != 0 ? (
          item.groceries.map((item, index) => (
            <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text style={styles.itemContentSubHeader}>Cafes</Text>
      <Text style={styles.itemContent}>
        {item.cafes.length != 0 ? (
          item.cafes.map((item, index) => (
            <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text style={styles.itemContentSubHeader}>Shopping</Text>
      <Text style={styles.itemContent}>
        {item.shopping.length != 0 ? (
          item.shopping.map((item, index) => (
            <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text style={styles.itemContentSubHeader}>Night life</Text>
      <Text style={styles.itemContent}>
        {item.nightLife.length != 0 ? (
          item.nightLife.map((item, index) => (
            <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
          ))
        ) : (
          <Text>-</Text>
        )}
      </Text>
      <Text>{`\n`}</Text>
    </ScrollView>
  );
};

const ExpandableListItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  // const [expandedRentals, setExpandedRentals] = useState(false);
  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [masterDataSource, setMasterDataSource] = useState([]);

  // useEffect(() => {
  //     axios.get("http://myneighborhoodscope.com/rentalApi.php")
  //         .then(response => { setFilteredDataSource(response.data); setMasterDataSource(response.data) })
  //         .catch(error => { });
  // }, []);

  // const showRentals = (nhood) => {
  //     //console.log(nhood);
  //     setExpandedRentals(true);
  //     var newData = masterDataSource;
  //     newData = masterDataSource.filter((item) =>
  //         item.neighborhood === nhood);
  //     setFilteredDataSource(newData);
  //     console.log(filteredDataSource);
  // };

  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const onAddSticker = () => {
  //     setIsModalVisible(true);
  //   };

  //   const onModalClose = () => {
  //     setIsModalVisible(false);
  //   };
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
        <Text style={styles.itemTitle}>
          {item.nhood}{" "}
          <Entypo
            name={expanded ? "chevron-down" : "chevron-right"}
            size={14}
            color="black"
          />
        </Text>
      </TouchableOpacity>
      {expanded && (
        <>
          <Text
            style={{
              color: "blue",
              fontSize: 15,
              marginTop: 6,
              fontWeight: 600,
            }}
            onPress={() => Linking.openURL(`${item.webLink}`)}
          >
            Link: {item.nhood}
          </Text>
          <Text style={styles.itemContentSubHeader}>Walk Score</Text>
          <Text style={styles.itemContent}>{item.walk}</Text>
          <Text style={styles.itemContentSubHeader}>Bike Score</Text>
          <Text style={styles.itemContent}>{item.bike}</Text>
          <Text style={styles.itemContentSubHeader}>Transit Score</Text>
          <Text style={styles.itemContent}>{item.transit}</Text>
          <Text style={styles.itemContentSubHeader}>Median Rent</Text>
          <Text
            style={{ marginTop: 10, fontSize: 14, color: "blue" }}
            onPress={() =>
              //Linking.openURL(`https://sfbay.craigslist.org/search/sfc/apa?query=${item.nhood}`)}
              navigation.navigate("View Rentals", {
                nhood: item.nhood,
                previousScreen: "SFScope",
              })
            }
          >
            {item.rent}
          </Text>

          {/* 
                    {!expandedRentals && (
                        <Text style={{ marginTop: 10, fontSize: 14, color: "blue", }}
                            onPress={() =>
                                //Linking.openURL(`https://sfbay.craigslist.org/search/sfc/apa?query=${item.nhood}`)}
                                showRentals(item.nhood)
                            }
                        >
                            View Rentals <Entypo name={expandedRentals ? 'chevron-down' : 'chevron-right'} size={14} color="black" />
                        </Text>
                    )}
                    {expandedRentals && (
                        <View>
                            <Text style={{ marginTop: 10, fontSize: 14, color: "blue", }}
                                onPress={() =>
                                    //Linking.openURL(`https://sfbay.craigslist.org/search/sfc/apa?query=${item.nhood}`)}
                                    setExpandedRentals(false)}
                            >
                                Hide Rentals <Entypo name={expandedRentals ? 'chevron-down' : 'chevron-right'} size={14} color="black" />
                            </Text>
                            <Text  style={[styles.itemContent, {color: 'blue'}]} onPress={() =>
                                //Linking.openURL(`https://sfbay.craigslist.org/search/sfc/apa?query=${item.nhood}`)}
                              setIsModalVisible(true)
                            }>View full details</Text>
                           <ViewDetailsOverlay isVisible={isModalVisible} onClose={onModalClose} item={item} rentals={filteredDataSource}></ViewDetailsOverlay>
                            <FlatList
                                data={filteredDataSource}
                                renderItem={({ item }) =>
                                    <View >
                                         <View style={{paddingTop: 10}}></View>
                                        <Text >{`Title \n ${item.title1}`}</Text>
                                        <Text >{`Price: \n ${item.price}`}</Text>
                                        <View style={{paddingBottom: 10}}></View>
                                    </View>
                                  

                                }
                                keyExtractor={item => item.id}
                            />
                        </View>
                    )} */}

          <Text style={styles.itemContentSubHeader}>Travel to Downtown</Text>
          <Text style={styles.itemContent}>{item.ttd}</Text>
          <Text style={styles.itemContentSubHeader}>Zipcodes</Text>
          <Text style={styles.itemContent}>
            {item.zipCodes.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`${item}, `}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Description</Text>
          <Text style={styles.itemContent}>{item.desc}</Text>
          <Text style={styles.itemContentSubHeader}>Arts</Text>
          <Text style={styles.itemContent}>
            {item.arts.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Restaurants</Text>
          <Text style={styles.itemContent}>
            {item.restaurants.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Groceries</Text>
          <Text style={styles.itemContent}>
            {item.groceries.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Cafes</Text>
          <Text style={styles.itemContent}>
            {item.cafes.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Shopping</Text>
          <Text style={styles.itemContent}>
            {item.shopping.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
          <Text style={styles.itemContentSubHeader}>Night life</Text>
          <Text style={styles.itemContent}>
            {item.nightLife.map((item, index) => (
              <Text key={index} style={styles.pointText}>{`- ${item}\n`}</Text>
            ))}
          </Text>
        </>
      )}
    </View>
  );
};

const ExpandableList = ({ data }) => {
  const renderItem = ({ item }) => <ExpandableListItem item={item} />;

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    axios
      .get("https://lacpalaganas.github.io/VS/neighborhood.json")
      .then((response) => {
        setFilteredDataSource(response.data);
        setMasterDataSource(response.data);
      })
      .catch((error) => {});
  }, []);

  const jobTypes = ["Most Affordable", "Easiest Parking", "Near Downtown"];
  const [activeJobType, setActiveJobType] = useState("");

  const filterFunction = (item) => {
    var newData = masterDataSource;
    switch (item) {
      case "Most Affordable":
        //alert("Most affordabble");
        //    newData  = masterDataSource.filter((item) =>
        //    Number(item.rent.replace(/[^0-9.-]+/g,"")) < 1800);
        newData = masterDataSource.filter((item) => item.mostAffordable === 1);
        break;
      case "Easiest Parking":
        //alert("Easisest Parking");
        newData = masterDataSource.filter((item) => item.easiestParking === 1);

        //console.log(filteredDataSource);
        break;
      case "Near Downtown":
        //alert("Near Downtown");
        newData = masterDataSource.filter((item) => item.nearDowntown === 1);
        break;
      case "":
      default:
        //alert("-");
        setFilteredDataSource(masterDataSource);
        break;
    }
    setFilteredDataSource(newData);
  };
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource

      if (activeJobType == "") {
        const newData = masterDataSource.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.nhood
            ? item.nhood.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        const newData = filteredDataSource.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.nhood
            ? item.nhood.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      }
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      if (activeJobType == "") {
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      } else {
        filterFunction(activeJobType);

        setSearch(text);
      }
    }
  };

  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemPress = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <View>
        {!selectedItem && (
          <View>
            <FlatList
              data={jobTypes}
              initialNumToRender={5}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tab(activeJobType, item)}
                  onPress={() => {
                    if (activeJobType == item) {
                      setActiveJobType("");
                      filterFunction("");
                    } else {
                      setActiveJobType(item);
                      filterFunction(item);
                    }
                  }}
                >
                  <Text style={styles.tabText(activeJobType, item)}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              style={{ paddingBottom: 0 }}
            />
            <TextInput
              style={styles.textInputStyle}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder="Search..."
              placeholderTextColor={COLORS.gray2}
            />
          </View>
        )}
      </View>

      {search.length != 0 || activeJobType != "" ? (
        selectedItem ? (
          <DetailsScreen route={{ params: { item: selectedItem } }} />
        ) : (
          <FlatList
            data={filteredDataSource}
            //renderItem={renderItem}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.itemTouchable}
                  onPress={() => handleItemPress(item)}
                >
                  <Text>{item.nhood}</Text>
                </TouchableOpacity>
              </View>
            )}
            initialNumToRender={10}
            removeClippedSubviews
            keyExtractor={(item) => item.nhoodID.toString()}
          />
        )
      ) : (
        <Text style={{ fontSize: SIZES.small, textAlign: "center" }}>
          Search or filter to populate data
        </Text>
      )}
      {selectedItem && (
        <TouchableOpacity onPress={handleBack}>
          <Text style={[styles.itemTitle]}>
            <Entypo name={"chevron-left"} size={14} color="black" /> Go Back
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const Compare = () => {
  const { data, isLoading, error } = useFetch();

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ExpandableList data={data} />
      </View>

      <View style={styles.item}>
        <ExpandableList data={data} />
      </View>
    </View>
  );
};

export default Compare;
