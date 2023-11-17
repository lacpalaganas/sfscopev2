import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./src/BottomTab/Home/Home";
import Events from "./src/BottomTab/Events/Events";
import Details from "./src/Stack/Details/Details";

import { COLORS } from "./constants";
import WhatToDo from "./src/BottomTab/WhatToDo/WhatToDo";
import Rentals from "./src/BottomTab/Rentals/Rentals";
import 'react-native-gesture-handler';
import RentalDetails from "./src/Components/RentalDetails/RentalDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
    //initialRouteName="Home"
    //barStyle={{ backgroundColor: COLORS.secondary}}
    // activeColor= {COLORS.lightWhite}
    // inactiveColor={COLORS.lightWhite}

    >
      <Tab.Screen name="SFScope" component={StackNavigator}

        options={{
          headerTitleAlign: 'center',
          headerBackgroundContainerStyle: { backgroundColor: 'red' },
          backgroundColor: COLORS.primary,
          tabBarLabel: 'Home',

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="What to do" component={WhatToDo}
        options={{
          tabBarLabel: 'What to do',
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-question" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Rentals" component={RentalsStack}
        options={{
          tabBarLabel: 'Rentals',
          headerTitleAlign: 'center',
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen name="Ads" component={Events}
        options={{

          headerTitleAlign: 'center',
          tabBarLabel: 'Ads',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="advertisements" color={color} size={26} />
          ),
        }}
      />


    </Tab.Navigator>
  )
}
const RentalsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search Rentals" component={Rentals} options={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerShadowVisible: false,
        headerTintColor: COLORS.lightWhite,
        headerShown: false
        // headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>),
        //headerRight: () => (<ScreenHeaderBtn iconUrl={images.compare} dimension="100%" handlePress={() => router.push(`/compare/`)}/>),


      }} />
      <Stack.Screen name="View Rentals" component={RentalDetails}
      r
        options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerTintColor: COLORS.lightWhite,
          // headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>),
          //headerRight: () => (<ScreenHeaderBtn iconUrl={images.compare} dimension="100%" handlePress={() => router.push(`/compare/`)}/>),


        }} />
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SFscope" component={Home}
        options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerTintColor: COLORS.lightWhite,
          headerShown: false
          // headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>),
          //headerRight: () => (<ScreenHeaderBtn iconUrl={images.compare} dimension="100%" handlePress={() => router.push(`/compare/`)}/>),


        }}
      />

      <Stack.Screen name="View Rentals" component={RentalDetails}
        options={{
          headerStyle: { backgroundColor: COLORS.secondary },
          headerShadowVisible: false,
          headerTintColor: COLORS.lightWhite,
          // headerLeft: () => (<ScreenHeaderBtn iconUrl={icons.menu} dimension="60%"/>),
          //headerRight: () => (<ScreenHeaderBtn iconUrl={images.compare} dimension="100%" handlePress={() => router.push(`/compare/`)}/>),


        }} />

    </Stack.Navigator>
  )
}

export default function App() {
  return (

    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}
