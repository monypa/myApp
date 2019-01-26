// Statistics.js

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View,
  StyleSheet, AsyncStorage, Alert, TextInput, Button, DateInput} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';
import Provider from '../Provider';

const Context0 = React.createContext();


class Provider0 extends Component {
  state = {
    name: 'John Doe',
    color: 'white',
    onPress: () => {
      this.setState(prevState => {
        return {
          color: prevState.color === 'lightgray' ? 'white' : 'lightgray',
          name: prevState.name === 'Jane Doe' ? 'John Doe' : 'Jane Doe'
        }
      });
    }
  }

  render() {
    return (
      <Context0.Provider value={this.state}>
        {this.props.children}
      </Context0.Provider>
    );
  }
}

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAthleteCreated: false,
    };
   }

   static navigationOptions = {
    title: 'Statistics',
   };

   navigateToEvents=()=>{
     this.props.navigation.navigate('Events');
   }

  render() {
    // const {navigate} = this.props.navigation;

    return (
      <Provider0>
        <Context0.Consumer>
          {context => (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: context.color}}>
              <Text>Name: {context.name} </Text>
              <Button
                title="Click me!"
                onPress={context.onPress}
              />
            </View>
          )}
        </Context0.Consumer>
      </Provider0>
    )
  }
}

export default Statistics;
