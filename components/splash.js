import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, Image
} from  'react-native';
import config from './../app.json';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header:null
    }
    componentDidMount() {
        this.timeoutHandle = setTimeout(() => {
            this.props.navigation.navigate('listMeasurement');
        }, 1500);
      }
      componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
      }
    render() {
        return (
            <View style={styles.wrapper}>
                <Image style={{width: 100, height: 100, marginLeft:10}}
                source={require('./../images/red-hair.png')}
                />
                <Text style={styles.header}>{config.name}</Text>
                {/* <Text style={styles.subtitle}>...an easy way to take down measurements</Text> */}
            </View>
        );
    }
}
// AppRegistry.registerComponent('SplashComponent', () => SplashScreen);

//styles
const styles= StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3B5998',
    },
    header:{
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle:{
        fontSize: 10,
        color: '#fff'
    }
});