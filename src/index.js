import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Voca from './Voca/Voca' 
import VocaLists from './Voca/VocaLists' 
import ModifyVoca from './Voca/ModifyVoca'
import Quiz from './Quiz/Quiz'
import QuizLists from './Quiz/QuizLists'
import { colors } from './theme'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MyTheme = {
    dark: false,
    colors: {
        primary: colors.letter,
        background: colors.background,
        card: colors.point,
        border: colors.point
    }
}


// function VocaLists() {
//     return (
//         <Text>Here will be shown VocaLists</Text>
//     )
// }

// function Voca() {
//     return (
//         <Text>Here will be shown Voca</Text>
//     )
// }

// function ModifyVoca() {
//     return (
//         <Text>Here will be shown ModifyVoca</Text>
//     )
// }

function ListsNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.point
                },
                headerTintColor: colors.letter
            }}
        >
            <Stack.Screen
                name="VocaLists"
                component={VocaLists}
                option={{
                    title: "Vocabulary Lists",
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "400"
                    }
                }}
            />
            <Stack.Screen
                name="Voca"
                component={Voca}
                // option={{
                //     title: "Voca",
                //     headerTitleStyle: {
                //         fontSize: 20,
                //         fontWeight: "400"
                //     }
                // }}
                options={({route}) => ({
                    title: route.params.unit.unit,
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "400"
                    }
                })}
            />
            <Stack.Screen
                name="ModifyVoca"
                component={ModifyVoca}
            />
        </Stack.Navigator>
    )
}



function QuizNav() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.point
                },
                headerTintColor: colors.letter
            }}
        >
            <Stack.Screen
                name="QuizLists"
                component={QuizLists}
            />
            <Stack.Screen
                name="Quiz"
                component={Quiz}
                options={({route}) => ({
                    title: route.params.unit.unit
                })}
            />
        </Stack.Navigator>
    )
}

function AppTabs() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
            >
                <Tab.Screen name="LISTS" component={ListsNav} />
                <Tab.Screen name="QUIZ" component={QuizNav} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppTabs;