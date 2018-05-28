import React, {Component} from 'react';
import { StackNavigator } from 'react-navigation';
import  SplashScreen  from './components/splash';
import  ListMeasurementScreen  from './components/measurement/list';
import  CreateMeasurementScreen  from './components/measurement/create';
import  EditMeasurementScreen  from './components/measurement/edit';


const RootStack  =  StackNavigator({
    Splash: {
        screen: SplashScreen,
    },
    listMeasurement: {
        screen: ListMeasurementScreen,
    },
    createMeasurement: {
        screen: CreateMeasurementScreen,
    },
    editMeasurement: {
        screen: EditMeasurementScreen,
    }
  }, {
      initialRouteName: 'Splash',
      navigationOptions:{
        headerStyle: {
            backgroundColor: '#425893',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }
  });
export default class Route extends Component{
    render() {
        return <RootStack />;
    }
}




