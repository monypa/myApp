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

   async handleAddDefaultData () {
     let disciplines = [['Discipline1', JSON.stringify({name: 'Cycling'})],
     ['Discipline22', JSON.stringify({name: 'Running'})]];
     AsyncStorage.multiSet(disciplines);

     let subDisciplines = [['SubDiscipline1_1', JSON.stringify({name: 'Road'})],
           ['SubDiscipline1_2', JSON.stringify({name: 'MTB'})],
           ['SubDiscipline1_3', JSON.stringify({name: 'Downhill'})],
           ['SubDiscipline2_1', JSON.stringify({name: 'Road'})],
           ['SubDiscipline2_2', JSON.stringify({name: 'Trail'})]];
     AsyncStorage.multiSet(subDisciplines);

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
      /**
      let data=''
      let value = await AsyncStorage.getItem('Athlete1');
      if (value !== null) {
        this.setState({textAthleteName: JSON.parse(value).name});
        this.setState({tempValue: 'Athlete1:' + value});
        this.setState({isAthleteCreated: true});
      } else {
        this.setState({textAthleteName: ''});
        this.setState({tempValue: ''});
        this.setState({isAthleteCreated: false});
      }

      value = await AsyncStorage.getItem('Discipline1');
      if (value !== null) {
        this.setState({tempValue: this.state.tempValue + '\n' + 'Discipline1: ' + value});
        this.setState({isObjCreated: true});
      } else {
        this.setState({isObjCreated: false});
      }

      value = await AsyncStorage.getItem('Discipline2');
      if (value !== null) {
        this.setState({tempValue: this.state.tempValue + '\n' + 'Discipline2: ' + value});
        this.setState({isObjCreated: true});
      } else {
        this.setState({isObjCreated: false});
      }

      data = '[' + data + ']'
      this.setState({arrValues: JSON.parse(data)});
      */

      const listData = [ ];
      let keys = await AsyncStorage.getAllKeys();
      var found = keys.find(function(element) {
        return element.substr(0,10) == 'Discipline' || element.substr(0,13) == 'SubDiscipline';
      });
      if (!found) {
        //Alert.alert('Adding default data...');
        //return this.handleAddDefaultData();
      }
      else {
        keys.forEach(async function(inKey) {
          const inValue = await AsyncStorage.getItem(inKey);
          inValue.key = inKey;
          listData.push({key: inKey, value: inValue});
        });
      }
      this.setState({ data : listData });

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
          <Button title='Add default data' onPress={() => {this.handleAddDefaultData();}} />
          <Button title='CLEAR ALL KEYS LOCALLY' onPress={this.clearAllKeysLocally} />
          <FlatList
            data={this.state.arrValues}
            renderItem={({item}) => <Text style={globalStyles.bigText}>{item.key}, {item.value1}, {item.value2}, {item.value3}</Text>}
          />
          <FlatList
          data={this.state.data}
          renderItem={ ({item}) =>
            <Text style={{
              borderBottomWidth : 1,
              borderColor : "#e0e0e0"
            }}>{item.key}: {item.value}</Text>
          }
        />
        </View>
      </View>
    )
  }
}

export default X_Debug;
