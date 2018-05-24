import React, {Component} from 'react';
import {Text,View, ScrollView, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import{Container, Header, Content, Left, Icon, Right, Title, Button, Body
    , List, ListItem} from 'native-base';
import config from './../../app.json';
const Realm = require('realm');
    
export default class ListMeasurementScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          persons: []
        };
    }
    static navigationOptions = {
        title: '',
        header: null,
        tabBarLabel: ''
    }
    componentWillMount() {
      //lets get the measurements from the database
      Realm.open({
        }).then(realm => {
            //sort in ascending order
            let persons = realm.objects('Person').sorted('fullname', false);
            this.setState({'persons': persons});
            console.log(persons);
        }).catch(error => {
            console.log(error);
        });
    }
    createMeasurement() {
      this.props.navigation.navigate('createMeasurement');
    }
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
      />
    );
    render() {
        return (
          <Container>
             <Header>
                <Left>
                   
                </Left>
                <Body>
                <Title>{config.name }</Title>
                </Body>
                <Right />
            </Header>
            <Content>
              <List>
                
                <ListItem itemDivider>
                  <Text>A</Text>
                </ListItem>                    
              </List>
            </Content>
            <View style={styles.createButtonWrapper}>
                <TouchableOpacity onPress= {this.createMeasurement.bind(this)}>
                    <View style={styles.createIconButton}>
                        <Icon name="md-add" style={styles.createIconText} />
                    </View>
                </TouchableOpacity>
            </View>
          </Container>
        );
    }
}
//styles
const styles= StyleSheet.create({
    createButtonWrapper: {
      flexDirection: 'column',
    },
    createIconButton: {
       backgroundColor: '#3B5998',
       padding: 20,
       borderRadius:100,
       width:70,
       height:70,
       alignItems: 'center',
       alignSelf: 'flex-end',
       marginBottom:20,
       marginRight: 20 
    },
    createIconText: {
      color:'#fff',
      fontSize: 34,
      fontWeight: 'bold'
    }
});