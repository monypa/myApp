// X_Debug.js

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View,
  StyleSheet, AsyncStorage, Alert, TextInput, Button, DateInput, FlatList} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';


class X_Debug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAthleteCreated: false,
      isObjCreated: false,
      textAthleteName: '',
      getValue: '',
      getAllKeys: '',
      tempValue: '',
      arrValues: [],
      data: []
    };
   }

   static navigationOptions = {
    title: 'X_Debug',
   };

   getValueLocally=()=>{
     AsyncStorage.getItem('AthleteName').then((value) => this.setState({getValue: value}));
   }

   getAllKeysLocally=()=>{
     AsyncStorage.getAllKeys().then((value) => this.setState({getAllKeys: value}));
   }

/*
   async handleAddDefaultData0 () {
     let disciplines = [['Discipline1', JSON.stringify({name: 'D1'})],
     ['Discipline22', JSON.stringify({name: 'D22'})]];
     AsyncStorage.multiSet(disciplines);

     let subDisciplines = [['SubDiscipline1_1', JSON.stringify({name: 'S1_1'})],
           ['SubDiscipline1_2', JSON.stringify({name: 'S1_2'})],
           ['SubDiscipline1_3', JSON.stringify({name: 'S1_3'})],
           ['SubDiscipline2_1', JSON.stringify({name: 'S2_1'})],
           ['SubDiscipline2_2', JSON.stringify({name: 'S2_2'})]];
     AsyncStorage.multiSet(subDisciplines);

     this._loadInitialState();
   }
*/

   async handleAddDefaultData () {
     let disciplines = [['Discipline1', JSON.stringify({key: 'Discipline1', name: 'Dummy1', values: ['S11', 'S12', 'S13']})],
     ['Discipline2', JSON.stringify({key: 'Discipline2', name: 'Dummy2', values: ['S21', 'S22']})],
     ['Test1', JSON.stringify({key: 'Test1', name: 'bla bla'})]];
     AsyncStorage.multiSet(disciplines);

     this._loadInitialState();
   }

   clearAllKeysLocally=()=>{
     this.setState({textAthleteName: ''});
     this.setState({tempValue: ''});
     this.setState({arrValues: []});
     this.setState({data: []});
     this.setState({isAthleteCreated: false});
     AsyncStorage.clear().done();
   }

  componentDidMount() {
    //this._loadInitialState().done();
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.isFocused()),
    ];
  }

  isFocused() {
    this._loadInitialState().done();
  }

  getAllValues() {
    try {
      return AsyncStorage.getAllKeys().then(ks => {
          return Promise.all(ks.map(k => AsyncStorage.getItem(k)));
      });
    } catch (e) {
      Alert.alert('Error:getAllValues:', error.message);
    }
   };

  async _loadInitialState() {
    try {
      const listData = [ ];
      let keys = await AsyncStorage.getAllKeys();
      var found = keys.find(function(element) {
        return element.substr(0,10) == 'Discipline';
      });
      if (!found) {
        //Alert.alert('Adding default data...');
        //return this.handleAddDefaultData();
      }
      else {
        var that=this;
        this.getAllValues().then(function(results) {
             for (var i = 0; i < results.length; i++) {
               //listData.push({key: JSON.parse(results[i]).key, value: JSON.parse(results[i]).name + ' ' + JSON.stringify(JSON.parse(results[i]).values)});
               listData.push({key: results[i]});
             }
             that.setState({ data : listData });
         }, function(error) {
             Alert.alert('Error:getAllValues:', error.message);
         });
       }

    } catch (error) {
      Alert.alert('Error:loadInitialState:', error.message);
    }
  };

  render() {
    // const {navigate} = this.props.navigation;

    return (
      <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
        <View style={{flex:1, backgroundColor: 'lightgray', alignItems: 'center'}}>
          <Text style={globalStyles.bigText}>Debug screen</Text>
          <Button title='Add dummy data' onPress={() => {this.handleAddDefaultData();}} />
          <Button title='CLEAR ALL KEYS LOCALLY' onPress={this.clearAllKeysLocally} />
          <FlatList
          data={this.state.data}
          renderItem={ ({item}) =>
            <Text style={{
              borderBottomWidth : 1,
              borderColor : "#e0e0e0"
            }}>{item.key}</Text>
          }
        />
        </View>
      </View>
    )
  }
}

export default X_Debug;
