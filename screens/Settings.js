// Settings.js
// TODO: clean imports
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View,
  StyleSheet, AsyncStorage, Alert, TextInput, Button, DateInput, SectionList, FlatList} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';
import { testFunction, loadDisciplines } from '../Common.js';

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
      data: [],
      sectionsTemp: [
        {title: 'Cycling1', data: ['Road1', 'MTB', 'Downhill']},
        {title: 'Running1', data: ['Road1', 'Trail']},
      ]
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
     //this._loadInitialState().done();
     //TODO: rever funcoes load
     this._load2();
console.log('Load completed: ' + JSON.stringify(this.state.data));
      let st = loadDisciplines(this.state.data);
      this.setState({sectionsTemp: st});
console.log('Disciplines loaded: ' + JSON.stringify(this.state.sectionsTemp));
   }

   _load2() {
     AsyncStorage.getAllKeys().then((keys) => {
        const listData = [ ];

        var found = keys.find(function(element) {
          return element.substr(0,10) == 'Discipline' || element.substr(0,13) == 'SubDiscipline';
        });
        if (!found) {
          Alert.alert('Adding default data...');
          return this._addDefaultData().done();
        }
        else {
          keys.forEach(async function(inKey) {
            const inValue = await AsyncStorage.getItem(inKey);
            inValue.key = inKey;
            listData.push({key: inKey, value: inValue});
          });
        }

        this.setState({ data : listData });
    })
    .then(res => {
        //do something else
    });
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
         return this._addDefaultData().done();
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

   async _addDefaultData () {
     let disciplines = [['Discipline1', JSON.stringify({name: 'Cycling'})],
     ['Discipline2', JSON.stringify({name: 'Running'})]];
     AsyncStorage.multiSet(disciplines);

     let subDisciplines = [['SubDiscipline1_1', JSON.stringify({name: 'Road'})],
           ['SubDiscipline1_2', JSON.stringify({name: 'MTB'})],
           ['SubDiscipline1_3', JSON.stringify({name: 'Downhill'})],
           ['SubDiscipline2_1', JSON.stringify({name: 'Road'})],
           ['SubDiscipline2_2', JSON.stringify({name: 'Trail'})]];
     AsyncStorage.multiSet(subDisciplines);
   }

   handleAddDefaultData () {
     this._addDefaultData().done();
     this._loadInitialState().done();

     let st = loadDisciplines(this.state.data);
     this.setState({sectionsTemp: st});
   }


/**
   async _loadInitialState() {
     try {
       const listData = [ ];
       let temp = [];
       let temp2 = [];
       let sectionsTemp0= [
         {title: 'Cycling1', data: ['Road1', 'MTB', 'Downhill']}
       ];
console.log('sectionsTemp0: ' + sectionsTemp0.length);
       let cont=0;
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
           temp[cont] = {title: 'title' + cont, data: ['v' + cont + '0', 'v' + cont + '1'] }
           //if (cont==0) { temp2[cont] = {title: 'Cycling1', data: ['Road1', 'MTB', 'Downhill']}; }
           //if (cont==1) { temp2[cont] = {title: 'Running1', data: ['Road1', 'Trail']}; }
           cont+=1;
           temp2 = [
             {title: 'Cycling1', data: ['Road1', 'MTB', 'Downhill']},
             {title: 'Running1', data: ['Road1', 'Trail']},
           ];
           sectionsTemp0= [
             {title: 'Cycling', data: ['Road', 'MTB', 'Downhill']},
             {title: 'Running', data: ['Road', 'Trail']}
           ];
console.log('sectionsTemp0: ' + sectionsTemp0.length);
         });
       }

console.log('sectionsTemp0: ' + sectionsTemp0.length);
       this.setState({ data : listData });
       this.setState({sectionsTemp: sectionsTemp0});

       //sectionsTemp: [
      //   {title: 'Cycling1', data: ['Road1', 'MTB', 'Downhill']},
      //   {title: 'Running1', data: ['Road1', 'Trail']},
      // ]

     } catch (error) {
       Alert.alert('Error:loadInitialState:', error.message);
     }
   };
*/

  render() {
    // const {navigate} = this.props.navigation;

    return (
      <View style={globalStyles.sectionContainer}>
        <SectionList
          sections={this.state.sectionsTemp}
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
    )
  }
}

export default Settings;
