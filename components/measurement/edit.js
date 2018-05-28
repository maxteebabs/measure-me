import React, {Component} from 'react';
import {Text,View, ScrollView, StyleSheet, Alert, TouchableOpacity, Dimensions} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Picker
    , Left, Right, Body, Label, Title, Button, Icon } from 'native-base';
import config from './../../app.json';
const Realm = require('realm');
    
export default class EditMeasureMentScreen extends Component {
    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        this.state = {
            active: 'false',
            id: state.params.item.id,
            fullname: state.params.item.fullname, 
            number: state.params.item.number, 
            gender: state.params.item.gender,
            shoulder: state.params.item.shoulder, 
            chest: state.params.item.chest, 
            arm_hole: state.params.item.arm_hole,
            elbow: state.params.item.elbow, 
            wrist: state.params.item.wrist, 
            full_sleeve: state.params.item.full_sleeve,
            round_sleeve: state.params.item.round_sleeve, 
            bust: state.params.item.bust, 
            under_bust: state.params.item.under_bust,
            waist: state.params.item.waist, 
            hips: state.params.item.hips, 
            half_length: state.params.item.half_length, 
            full_length: state.params.item.full_length,
            realm: {}
        };
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
            realm.create('Measurement',  {
                id: this.state.id,
                modified_at: new Date(),
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
            }, true);
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
              <Form>
                <Item floatingLabel>
                    <Label>Fullname</Label>
                    <Input onChangeText={(fullname) => this.setState({fullname})}
                        value={this.state.fullname} />
                </Item>
                <Item floatingLabel>
                    <Label>Phone Number </Label>
                    <Input onChangeText={(number) => this.setState({number})}
                        value={this.state.number} />
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
                    <Input onChangeText={(chest) => this.setState({chest})}
                    value={this.state.chest} />
                </Item>
                <Item floatingLabel>
                    <Label>Shoulder </Label>
                    <Input onChangeText={(shoulder) => this.setState({shoulder})}
                     value={this.state.shoulder} />
                </Item>
               
                <Item floatingLabel>
                    <Label>Round Arm Hole </Label>
                    <Input onChangeText={(arm_hole) => this.setState({arm_hole})} 
                    value={this.state.arm_hole}/>
                </Item>
                <Item floatingLabel>
                    <Label>Round Elbow </Label>
                    <Input onChangeText={(elbow) => this.setState({elbow})}
                        value={this.state.elbow} />
                </Item>
                <Item floatingLabel>
                    <Label>Round Wrist </Label>
                    <Input onChangeText={(wrist) => this.setState({wrist})} 
                        value={this.state.wrist}/>
                </Item>
                <Item floatingLabel>
                    <Label>Full Sleeve(Shoulder to Wrist) </Label>
                    <Input onChangeText={(full_sleeve) => this.setState({full_sleeve})} 
                        value={this.state.full_sleeve}/>
                </Item>
                <Item floatingLabel>
                    <Label>Round Sleeve </Label>
                    <Input onChangeText={(round_sleeve) => this.setState({round_sleeve})} 
                        value={this.state.round_sleeve}/>
                </Item>
                <Item floatingLabel>
                    <Label>Bust </Label>
                    <Input  onChangeText={(bust) => this.setState({bust})} 
                        value={this.state.bust}/>
                </Item>
                <Item floatingLabel>
                    <Label>Under Bust </Label>
                    <Input  onChangeText={(under_bust) => this.setState({under_bust})} 
                        value={this.state.under_bust}/>
                </Item>
                <Item floatingLabel>
                    <Label>Waist </Label>
                    <Input  onChangeText={(waist) => this.setState({waist})} 
                        value={this.state.waist}/>
                </Item>
                <Item floatingLabel>
                    <Label>Hips </Label>
                    <Input  onChangeText={(hips) => this.setState({hips})} 
                        value={this.state.hips} />
                </Item>
                <Item floatingLabel last>
                    <Label>Half Length </Label>
                    <Input  onChangeText={(half_length) => this.setState({half_length})} 
                        value={this.state.half_length}/>
                </Item>
                <Item floatingLabel last>
                    <Label>Full Length </Label>
                    <Input  onChangeText={(full_length) => this.setState({full_length})} 
                        value={this.state.full_length}/>
                </Item>
                <TouchableOpacity onPress= {this.storeMeasurement}>
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
        backgroundColor: '#3B5998'
    },
    submitButtonText: {
        padding: 20,
        color: '#fff'
    }
});