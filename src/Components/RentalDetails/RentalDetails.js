import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Linking, Image, ActivityIndicator } from 'react-native'
import { React, useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../../constants'
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
import styles from "./rentaldetails.style";
import { Entypo } from '@expo/vector-icons';
import { SliderBox } from 'react-native-image-slider-box';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// Function to render each image
const renderImage = ({ item }) => (
    <Image
        source={{ uri: item }}
        style={styles.image}
    />
);

const ExpandableRentalsItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);
    const [images, setImages] = useState([]);
    const [imagesObject, setImagesObbject] = useState();
    const toggleExpand = () => {
        setExpanded(!expanded);


    };

    useEffect(() => {
        getRentalImages();
    }, []);

    const getRentalImages = () => {

        const nonNullPhotos = Object.keys(item)
            .filter(key => key.startsWith("photo") && item[key] !== null) // Filter keys starting with "photo" and non-null values
            .map(key => item[key]); // Map non-null values to an array

        // Display non-null photos
        console.log(nonNullPhotos);
        setImages(nonNullPhotos);
        // Convert the array to an array of objects with a key
        // const dataObjects = nonNullPhotos.map((value, index) => ({
        //     key: index.toString(),
        //     value: value,
        // }));

        // setImagesObbject(dataObjects);
        // console.log(imagesObject);
        //setImages(["https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg","https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="]);
    }

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={toggleExpand}
                style={styles.itemTouchable}
            >
                <Text style={styles.itemTitle}>
                    {`${item.title1} | ${item.price}\n`} <Text style={{ fontSize: 13, fontStyle: 'italic', color: COLORS.gray }}>{expanded ? 'see less..' : 'see more..'}</Text>
                    {/* <Entypo name={expanded ? 'chevron-down' : 'chevron-right'} size={14} color="black" /> */}

                </Text>


            </TouchableOpacity>
            {expanded && (
                <>
                    <Text style={styles.itemContentSubHeader}>
                        Contact: <Text style={styles.itemContent}>{item.contact}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Price: <Text style={styles.itemContent}>{item.price}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Rent period: <Text style={styles.itemContent}>{item.rentPeriod}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Bedrooms: <Text style={styles.itemContent}>{item.bedrooms}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Bathrooms: <Text style={styles.itemContent}>{item.bathrooms}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Pets: <Text style={styles.itemContent}>{item.pets}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Furnished: <Text style={styles.itemContent}>{item.furnished}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Wheelchair: <Text style={styles.itemContent}>{item.wheelchair}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Airconditioning: <Text style={styles.itemContent}>{item.airconditioning}</Text>
                    </Text >
                    <Text style={styles.itemContentSubHeader}>
                        Parking: <Text style={styles.itemContent}>{item.parking}</Text>
                    </Text >
                    {/* <View>
                    <SliderBox
                        images={images}
                        sliderBoxHeight={200}
                        ImageComponentStyle={{ borderRadius: 15, width: '90%', marginTop: 5, marginRight: 33, }}
                        dotColor={COLORS.tertiary}
                        inactiveDotColor="#90A4AE"
                        onCurrentImagePressed={index => Linking.openURL(`${images[index]}`)}
                        paginationBoxVerticalPadding={10}

                        autoplay
                        circleLoop

                    />
                    </View> */}
                    {/* <Image source={{ uri: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg" }}
                                    style={styles.image}
                                /> */}

                    <FlatList
                        horizontal
                        data={images}
                        renderItem={renderImage}
                        keyExtractor={(item) => item.id }
                        key={(item) => item.id }

                    />
                    <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 5, fontSize: 10 }}>
                        Swipe left and right to view more images
                    </Text>

                </>
            )}

        </View>
    );
};
const RentalDetails = () => {
    const renderItem = ({ item }) => (
        <ExpandableRentalsItem item={item} />
    );
    const [isLoading, setIsLoading] = useState(false);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const route = useRoute();
    const { nhood } = route.params;
    const { previousScreen } = route.params;
    const navigation = useNavigation();
    const changeTitle = () => {
        navigation.setOptions({
            title: nhood + " Rentals", // Set your dynamic title here

        });
    };

    
    useEffect(() => {
        //console.log(previousScreen);
        changeTitle();
        // axios.get("http://myneighborhoodscope.com/rentalApi.php")
        //     .then(response => {
        //         setFilteredDataSource(response.data.filter((item) =>
        //             item.neighborhood === nhood && item.active == 1)); setMasterDataSource(response.data)
        //     })
        //     .catch(error => { });
        //getData();
        // var newData = masterDataSource;
        // newData = masterDataSource.filter((item) =>
        //     item.neighborhood === nhood);
        // setFilteredDataSource(newData);
        // console.log(filteredDataSource);
        const fetchData = async () => {
            try {
                setIsLoading(true);
              const response = await fetch('https://myneighborhoodscope.com/rentalApi.php');
              const data = await response.json();
              
              var newData = data.filter((item) =>
              item.neighborhood == nhood.toString() && item.active == 1);
              setFilteredDataSource(newData);
              console.log(newData);
              setIsLoading(false);
            } catch (error) {
              console.error('Error fetching data: ', error);
            }
          };
          fetchData();
    }, []);
    const getData = async () => {
        setIsLoading(true);
        const result = await axios.get("https://myneighborhoodscope.com/rentalApi.php")
            .then(response => {
                setMasterDataSource(response.data);
                setIsLoading(false);
                var newData = masterDataSource;
                newData = masterDataSource; 
                setFilteredDataSource(response.data.filter((item) =>
                            item.neighborhood == nhood && item.active == 1));
            })
            .catch(error => { });
          
        console.log("getData");
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={{ alignItems: 'center',
        justifyContent: 'center'}}>
             <View style={{  width: '80%', padding: 10, backgroundColor: '#007BFF', marginTop: 20, borderWidth: 1, borderColor: '007BFF', borderRadius: 6 }}>
            <TouchableOpacity onPress={() => {
             getData()
            }}>
              <Text style={{ color: "white", textAlign: 'center', fontSize: 14 }}> {`Refresh`}</Text>
            </TouchableOpacity>

          </View>
          </View>
            {/* <TouchableOpacity onPress={() => getData()}>
                <Text>Refresh</Text>
            </TouchableOpacity> */}
            {isLoading ? (
                 <View style={{ justifyContent: 'center', height: '100%', }}>
                <ActivityIndicator size='large' color={COLORS.primary} /> 
             </View>
            ):filteredDataSource.length != 0 ?
                (
                    <View style={[styles.container, { padding: SIZES.small }]}>


                        <FlatList
                            data={filteredDataSource}
                            renderItem={renderItem}
                            //     renderItem={({ item }) =>
                            //     <View >
                            //          <View style={{paddingTop: 10}}></View>
                            //         <Text >{`Title \n ${item.title1}`}</Text>
                            //         <Text >{`Price: \n ${item.price}`}</Text>
                            //         <View style={{paddingBottom: 10}}></View>
                            //     </View>

                            // }
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                ) : (
                    <View style={{ justifyContent: 'center', height: '100%', }}>
                        <Text style={{ textAlign: 'center' }} >No available rentals for {nhood}</Text>
                    </View>
                )
            }



        </SafeAreaView>
    )
}

export default RentalDetails