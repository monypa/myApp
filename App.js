import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventsScreen from './screens/Events';
import AthleteScreen from './screens/Athlete';
import StatisticsScreen from './screens/Statistics';
import SettingsScreen from './screens/Settings';
import X_DebugScreen from './screens/X_Debug';

//export default createAppContainer(createBottomTabNavigator(
export default createAppContainer(createMaterialTopTabNavigator(
  {
    Athlete: { screen: AthleteScreen },
    Events: { screen: EventsScreen },
    Statistics: { screen: StatisticsScreen },
    Settings: { screen: SettingsScreen },
    X_Debug: { screen: X_DebugScreen },
  },
  {
    initialRouteName: 'X_Debug',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Athlete') {
          iconName = 'md-person';
        } else if (routeName === 'Events') {
          iconName = 'md-bicycle';
        } else if (routeName === 'Statistics') {
          iconName = 'md-stats';
        } else if (routeName === 'Settings') {
          iconName = 'md-settings';
        } else if (routeName === 'X_Debug') {
          iconName = 'md-bug';
        }

        return <Ionicons name={iconName} size={28} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f0edf6',
      inactiveTintColor: '#3e2465',
      showIcon: true,
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 12,
      },
    },
  }
));
