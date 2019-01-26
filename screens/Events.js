// Events.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Alert, TextInput, TouchableOpacity, Button } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAthleteCreated: false,
      textAthleteName: '',
    };
   }

   static navigationOptions = {
    title: 'Events',
   };

  componentDidMount() {
    this._loadInitialState().done();
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.isFocused()),
    ];
  }

  isFocused() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      let value = await AsyncStorage.getItem('Athlete1');
      if (value !== null) {
        this.setState({textAthleteName: JSON.parse(value).name});
        this.setState({isAthleteCreated: true});
      } else {
        this.setState({isAthleteCreated: false});
      }
    } catch (error) {
      Alert.alert('Error:AsyncStorage:', error.message);
    }
  };

  goToSettings = () => {
    this.props.navigation.navigate('Settings');
  }

  handleOnNavigateBack = () => {
    this._loadInitialState().done();
  }

  render() {
    // const {navigate} = this.props.navigation;
    if (!this.state.isAthleteCreated) {
      return (
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
          <View style={globalStyles.container}>
            <Text style={globalStyles.bigText}>Create a new Athlete first</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
          <View style={globalStyles.container}>
            <Text style={globalStyles.bigText}>Hello {this.state.textAthleteName}</Text>
            <Button title='Settings' onPress={this.goToSettings} />
          </View>
        </View>
      );
    }
  }
}

export default Events;
