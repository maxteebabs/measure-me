import React, {Component} from 'react';
import {Text,View, ScrollView, StyleSheet, Alert, TouchableOpacity, Dimensions, YellowBox} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Picker
    , Left, Right, Body, Label, Title, Button, Icon } from 'native-base';
import config from './../../app.json';
const Realm = require('realm');
    
export default class CreateMeasureMentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'false',
            fullname: '', number: '', gender: '',
            shoulder: '', chest: '', arm_hole: '',
            elbow: '', wrist: '', full_sleeve: '',
            round_sleeve: '', bust: '', under_bust: '',
            waist: '', hips: '', half_length: '', full_length: '',
            realm: {}
        };
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        this.storeMeasurement = this.storeMeasurement.bind(this);
    }
    static navigationOptions = {
        title: '',
        header: null,
        tabBarLabel: ''
    }
    listMeasurement() {
        this.props.navigation.navigate('listMeasurement');
    }
    storeMeasurement() {
        let fullname = this.state.fullname;
        let number = this.state.number;
        let gender = this.state.gender;
        if(fullname.length == 0) { alert('Fullname is required'); return false;}
        if(number.length == 0) { alert('Mobile number is required'); return false;}
        if(gender.length == 0) { alert('Gender is required'); return false;}
        //put other options
        var PersonSchema =  {
            name: 'Measurement',
            primaryKey: 'id',
            properties: {
                id: 'int',
                fullname: 'string', 
                number: 'string', 
                gender: 'string',
                shoulder: 'string?', 
                chest: 'string?', 
                arm_hole:'string?',
                elbow: 'string?', 
                wrist: 'string?', 
                full_sleeve: 'string?',
                round_sleeve: 'string?', 
                bust: 'string?', 
                under_bust: 'string?',
                waist: 'string?', 
                hips: 'string?', 
                half_length: 'string?', 
                full_length: 'string?',
                created_at: 'date?',
                modified_at: 'date?',
            }
        }
        
        Realm.open({
            schema: [PersonSchema]
        }).then(realm => {
            // realm.deleteRealmFile(this);
        realm.write(() => {
            var max_id = realm.objects('Measurement').length;
            if(!max_id) {
                max_id = 1;
            }else{
                console.log('the id is '+max_id);
                max_id = parseInt(max_id) + 1;
            }
            realm.create('Measurement',  {
                id: max_id,
                created_at: new Date(),
                fullname: this.state.fullname, 
                number: this.state.number, 
                gender: this.state.gender,
                shoulder: this.state.shoulder, 
                chest: this.state.chest, 
                arm_hole: this.state.arm_hole,
                elbow: this.state.elbow, 
                wrist: this.state.wrist, 
                full_sleeve: this.state.full_sleeve,
                round_sleeve: this.state.round_sleeve, 
                bust: this.state.bust, 
                under_bust: this.state.under_bust,
                waist: this.state.waist, 
                hips: this.state.hips, 
                half_length: this.state.half_length, 
                full_length: this.state.full_length
            });
        });
        this.setState({ realm });
        // realm.close();        
        }).catch(error => {
            console.log(error);alert(error);return false;
        });
        this.timeoutHandle = setTimeout(() => {
            alert('Saved successfully');
        }, 1500);
        // redirect
        this.props.navigation.navigate('listMeasurement');
    }
    render() {
        var width = Dimensions.get('window').width;
        return (
          <Container>
            <Content>
            <Header>
                <Left>
                    <Button transparent onPress= {this.listMeasurement.bind(this)}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                <Title>{config.name }</Title>
                </Body>
                <Right />
            </Header>
              <Form style={styles.padder}>
                <Item floatingLabel>
                    <Label>Fullname</Label>
                    <Input onChangeText={(fullname) => this.setState({fullname})} />
                </Item>
                <Item floatingLabel>
                    <Label>Phone Number </Label>
                    <Input onChangeText={(number) => this.setState({number})} />
                </Item>
                
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: width, marginTop:5, marginLeft: 10  
                        , color: '#333333' }}
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                    >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker>
                <Item floatingLabel>
                    <Label>Chest </Label>
                    <Input onChangeText={(chest) => this.setState({chest})} />
                </Item>
                <Item floatingLabel>
                    <Label>Shoulder </Label>
                    <Input onChangeText={(shoulder) => this.setState({shoulder})} />
                </Item>
               
                <Item floatingLabel>
                    <Label>Round Arm Hole </Label>
                    <Input onChangeText={(arm_hole) => this.setState({arm_hole})} />
                </Item>
                <Item floatingLabel>
                    <Label>Round Elbow </Label>
                    <Input onChangeText={(elbow) => this.setState({elbow})} />
                </Item>
                <Item floatingLabel>
                    <Label>Round Wrist </Label>
                    <Input onChangeText={(wrist) => this.setState({wrist})} />
                </Item>
                <Item floatingLabel>
                    <Label>Full Sleeve(Shoulder to Wrist) </Label>
                    <Input onChangeText={(full_sleeve) => this.setState({full_sleeve})} />
                </Item>
                <Item floatingLabel>
                    <Label>Round Sleeve </Label>
                    <Input onChangeText={(round_sleeve) => this.setState({round_sleeve})} />
                </Item>
                {/* <Item floatingLabel>
                    <Label>Round Neck </Label>
                    <Input   onChangeText={(round_sleeve) => this.setState({round_sleeve})} />
                </Item> */}
                {/* <Item floatingLabel>
                    <Label>Shoulder </Label>
                    <Input  />
                </Item> */}
                <Item floatingLabel>
                    <Label>Bust </Label>
                    <Input  onChangeText={(bust) => this.setState({bust})} />
                </Item>
                <Item floatingLabel>
                    <Label>Under Bust </Label>
                    <Input  onChangeText={(under_bust) => this.setState({under_bust})} />
                </Item>
                <Item floatingLabel>
                    <Label>Waist </Label>
                    <Input  onChangeText={(waist) => this.setState({waist})} />
                </Item>
                <Item floatingLabel>
                    <Label>Hips </Label>
                    <Input  onChangeText={(hips) => this.setState({hips})} />
                </Item>
                <Item floatingLabel last>
                    <Label>Half Length </Label>
                    <Input  onChangeText={(half_length) => this.setState({half_length})} />
                </Item>
                <Item floatingLabel last>
                    <Label>Full Length </Label>
                    <Input  onChangeText={(full_length) => this.setState({full_length})} />
                </Item>
                <TouchableOpacity onPress= {this.storeMeasurement} >
                    <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Save Changes</Text>
                    </View>
                </TouchableOpacity>
              </Form>
            </Content>
          </Container>
        );
    };
}
//styles
const styles = StyleSheet.create({
    submitButton: {
        marginTop: 30,
        alignItems: 'center',
        backgroundColor: '#3B5998',
        marginBottom: 20
    },
    submitButtonText: {
        padding: 20,
        color: '#fff'
    },
    padder: {
        paddingLeft: 8,
        paddingRight: 8
    }
});