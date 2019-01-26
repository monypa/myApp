// Settings.js
// TODO: clean imports
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View,
  StyleSheet, AsyncStorage, Alert, TextInput, Button, DateInput, SectionList, FlatList} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';
//import { testFunction } from '../Common.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAthleteCreated: false,
      modalVisible: false,
      getAllKeys: '',
      disciplines: {name: ''},
      subDisciplines: {name: ''},
      arrDisciplines: [{key: 1, value: "Cycling"}],
      arrSubDisciplines: [],
      data: []
    };
   }

   toggleModal(visible) {
      this.setState({ modalVisible: visible });
   }


   static navigationOptions = {
    title: 'Settings',
   };

   navigateToEvents=()=>{
     this.props.navigation.navigate('Events');
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
       const listData = [ ];
       let keys = await AsyncStorage.getAllKeys();
       var found = keys.find(function(element) {
         return element.substr(0,10) == 'Discipline' || element.substr(0,13) == 'SubDiscipline';
       });
       if (!found) {
         Alert.alert('Adding default data...');
         return this.handleAddDefaultData();
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
      <View style={globalStyles.sectionContainer}>
        <FlatList
            data={this.state.data}
            renderItem={ ({item}) =>
              <Text style={{
                borderBottomWidth : 1,
                borderColor : "#e0e0e0"
              }}>{item.key}: {item.value}</Text>
            }
          />
        <Text style={globalStyles.text}>## STATIC DATA ##</Text>
        <SectionList
          sections={[
            {title: 'Cycling', data: ['Road', 'MTB', 'Downhill']},
            {title: 'Running', data: ['Road', 'Trail']},
          ]}
          renderSectionHeader={({section}) => <Text style={globalStyles.sectionHeader}>{section.title}</Text>}
          renderItem={({item}) => <Text style={globalStyles.sectionItem}>{item}</Text>}
          keyExtractor={(item, index) => index}
        />
        <Modal animationType = {"slide"} transparent = {false}
             visible = {this.state.modalVisible}
               onRequestClose = {() => { } }>

             <View style = {globalStyles.modal}>
                <Text style = {globalStyles.text}>Modal is open!</Text>

                <TouchableHighlight onPress = {() => {
                   this.toggleModal(!this.state.modalVisible)}}>

                   <Text style = {globalStyles.text}>Close Modal</Text>
                </TouchableHighlight>
             </View>
          </Modal>

          <TouchableHighlight onPress = {() => {this.toggleModal(true)}}>
             <Text style = {globalStyles.text}>Open Modal</Text>
          </TouchableHighlight>

          <Text>Name: {this.state.disciplines.name}</Text>
          <Text>Array[0]: {JSON.stringify(this.state.arrDisciplines.length)}</Text>
          <Text>Keys: {this.state.getAllKeys}</Text>
      </View>
    )
  }
}

export default Settings;
