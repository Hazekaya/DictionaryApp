import React from 'react';
import StyleSheet from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EntryPage from "./components/EntryPage";
import LemmaPage from "./components/LemmaPage";

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer theme={theme}>
                <Tab.Navigator>
                    <Tab.Screen name="Kanji" component={EntryPage}/>
                    <Tab.Screen name='Definitions' component={LemmaPage}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3498db',
        accent: '#21c40f',
    }
};