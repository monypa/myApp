// Settings.js
// TODO: clean imports
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View,
  StyleSheet, AsyncStorage, Alert, TextInput, Button, DateInput, SectionList, FlatList} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';
//import { testFunction, loadDisciplines } from '../Common.js';

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
      arrData: [ ],
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
          Alert.alert('Adding default data...');
          return this.handleAddDefaultData();
        }
        else {
          var that=this;
          this.getAllValues().then(function(results) {
               for (var i = 0; i < results.length; i++) {
                 //console.log(results[i]);
                 if (JSON.parse(results[i]).key.substr(0,10) == 'Discipline') {
                   listData.push({title: JSON.parse(results[i]).name, data: JSON.parse(results[i]).values});
                 }
               }
               that.setState({ arrData : listData });
           }, function(error) {
               Alert.alert('Error:getAllValues:', error.message);
           });
         }
      } catch (error) {
        Alert.alert('Error:loadInitialState:', error.message);
      }
    };

   async handleAddDefaultData () {
     let disciplines = [['Discipline1', JSON.stringify({key: 'Discipline1', name: 'Cycling', values: ['Road', 'MTB', 'Downhill']})],
     ['Discipline2', JSON.stringify({key: 'Discipline2', name: 'Running', values: ['Road', 'Trail']})]];
     AsyncStorage.multiSet(disciplines);

     this._loadInitialState();
   }

  render() {
    // const {navigate} = this.props.navigation;

    return (
      <View style={globalStyles.sectionContainer}>
        <SectionList
          sections={this.state.arrData}
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
      </View>
    )
  }
}

export default Settings;
