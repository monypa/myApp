// Athlete.js

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View,
  StyleSheet, AsyncStorage, Alert, TextInput, Button, DateInput} from 'react-native'
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import t from 'tcomb-form-native';
import {createStackNavigator} from 'react-navigation';
import globalStyles from './Style';

const Form = t.form.Form;
const introWithAthlete = 'Hello Athlete, this is your data.';
const introWithoutAthlete = 'Please create a new Athlete profile.';
/**
const options = {
  fields: {
    name: {
      error: 'Mandatory'
    },
    birthDate: {
      label: 'Birth Date',
      mode: 'date',
      config: {
        format: (date) => moment(date).format('DD-MM-YYYY'),
      },
      maximumDate: maxDate,
    },
  },
  stylesheet: formStyles,
};
*/

const options = {
  fields: {
    name: {
      error: 'Mandatory'
    },
  },
  stylesheet: formStyles,
};

const formStyles = {
  ...Form.stylesheet,
}

var maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear());

class Athlete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAthleteCreated: false,
      //textInputAthleteName: '',
      //dateInputBirthDate: '',
      //textInputOtherStuff: '',
      //textInputPlaceholderName: '',
      //textInputPlaceholderOtherStuff: '',
      intro: '',
      athlete: {name: '', birthDate: '', otherStuff: ''},
      user: t.struct({
        name: t.String,
        birthDate: t.maybe(t.String),
        otherStuff: t.maybe(t.String)
      }),
    };
   }

   static navigationOptions = {
    title: 'Athlete',
   };

   handleSubmitForm = () => {
    const value = this._form.getValue();

    if (value) {
      var t = require('tcomb-validation');
      var validate = t.validate;

      // this.setState({user: value});
      //let dtDate = new Date(value.birthDate);
      //let strDate = dtDate.getDate() + '-' + dtDate.getMonth()+1 + '-' + dtDate.getFullYear();
      if (!validate(value.name, t.String).isValid()) {
        return;
      } else {
        let _name='', _birthDate='', _otherStuff='';
        if (value.name) { _name=value.name; }
        if (value.birthDate){ _birthDate=value.birthDate; }
        if (value.otherStuff) { _otherStuff=value.otherStuff }

        this.setState({athlete: {name: _name,
                                  birthDate: _birthDate,
                                  otherStuff: _otherStuff}});
        let Athlete1_object = {
           name: _name,
           birthDate: _birthDate,
           otherStuff: {s1: _otherStuff},
         };
         if (this.state.isAthleteCreated) {
           AsyncStorage.setItem('Athlete1',JSON.stringify(Athlete1_object)).done();
         } else {
           AsyncStorage.mergeItem('Athlete1',JSON.stringify(Athlete1_object)).done();
         }

         this.setState({intro: introWithAthlete, isAthleteCreated: true});
         //this.setState({isAthleteCreated: true});
         Alert.alert('Data saved successfully');
      }
    }
   }

/**
   handleSetAthlete=()=>{
     if (this.state.textInputAthleteName == '') {
       return Alert.alert('Please insert a name to continue.');
     }

     let Athlete1_object = {
        name: this.state.textInputAthleteName,
        birthDate: this.state.dateInputBirthDate,
        otherStuff: {s1: this.state.textInputOtherStuff},
      };
     if (this.state.isAthleteCreated) {
       AsyncStorage.setItem('Athlete1',JSON.stringify(Athlete1_object));
       this.setState({isAthleteCreated: true});
     } else {
       AsyncStorage.mergeItem('Athlete1',JSON.stringify(Athlete1_object));
       this.setState({isAthleteCreated: true});
     }
     Alert.alert('Data saved successfully');
   }
*/

   handleDeleteAthlete=()=>{
     Alert.alert(
      'Delete Athele',
      'Are you sure you want to delete the Athlete and all its data?',
      [
        {text: 'OK', onPress: this.clearAllKeysLocally},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: false }
    )
   }

   clearAllKeysLocally=()=>{
     AsyncStorage.removeItem('Athlete1').done();
     // this.setState({textInputAthleteName: ''});
     //this.setState({dateInputBirthDate: ''});
     //this.setState({textInputOtherStuff: ''});
     this.setState({athlete: {name: '', birthDate: '', otherStuff: ''}});
     //this.setState({isAthleteCreated: false});
     this.setState({intro: introWithoutAthlete, isAthleteCreated: false});
     //TODO:clear  other props
     Alert.alert('All data cleared successfully.');
   }


   async _loadInitialState() {
     try {
       let value = await AsyncStorage.getItem('Athlete1');
       if (value !== null) {
         //this.setState({textInputAthleteName:JSON.parse(value).name});
         //this.setState({dateInputBirthDate:JSON.parse(value).birthDate});
         //this.setState({textInputOtherStuff:JSON.parse(value).otherStuff.s1});

         this.setState({athlete: {name: JSON.parse(value).name,
                                  birthDate: JSON.parse(value).birthDate,
                                  otherStuff: JSON.parse(value).otherStuff.s1}});

         this.setState({intro: introWithAthlete, isAthleteCreated: true});
         //if (JSON.parse(value).otherStuff.s1=='') {
          // this.setState({textInputPlaceholderOtherStuff: 'Insert other stuff here'});
         //}

         //this.setState({isAthleteCreated: true});
       } else {
         let today = new Date();
         today=today.getDate() + '-' + today.getMonth()+1 + '-' + today.getFullYear();

         //this.setState({textInputAthleteName: ''});
         //this.setState({dateInputBirthDate: today});
         //this.setState({textInputOtherStuff: ''});

         this.setState({athlete: {name: '',
                                  birthDate: today,
                                  otherStuff: ''}});

         this.setState({intro: introWithoutAthlete, isAthleteCreated: false});
         //this.setState({textInputPlaceholderName: 'Insert the name here'});
         //this.setState({textInputPlaceholderOtherStuff: 'Insert other stuff here'});

         //this.setState({isAthleteCreated: false});

       }
     } catch (error) {
       Alert.alert('Error: loading data:', error.message);
     }
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

  render() {
    // const {navigate} = this.props.navigation;

    let today = new Date();
    today=today.getDate() + '-' + today.getMonth()+1 + '-' + today.getFullYear();

    return (
      <View style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch'}}>
        <View style={globalStyles.container}>
          <Text style={globalStyles.bigText}>{this.state.intro}</Text>
          <Form
            ref={c => this._form = c}
            type={this.state.user}
            value={this.state.athlete}
            options={options}
          />
          <Button
            title="Save Athlete"
            onPress={this.handleSubmitForm}
          />
          <Button title='Delete Athlete' disabled={!this.state.isAthleteCreated} onPress={this.handleDeleteAthlete} />
        </View>
      </View>
    )
  }
}

export default Athlete;
