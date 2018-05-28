import React, {Component} from 'react';
import {Text,View, ScrollView, StyleSheet, FlatList, TouchableOpacity, Alert
  , TouchableHighlight, YellowBox} from 'react-native';
import{Container, Header, Content, Left, Icon, Right, Title, Item, Input, Button, Body
    , List, ListItem, SwipeRow} from 'native-base';
import config from './../../app.json';
const Realm = require('realm');
    
export default class ListMeasurementScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          persons: [],
          realm: {},
          search: '',
        };
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    }
    static navigationOptions = {
        title: '',
        header: null,
        tabBarLabel: ''
    }

    componentWillMount() {
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
      //lets get the measurements from the database
      Realm.open({
        schema: [PersonSchema]
        }).then(realm => {
        // realm.deleteRealmFile(this);
        realm.write(() => {
            //sort in ascending order
            var persons = realm.objects('Measurement').sorted('fullname', false);
            this.setState({persons: persons});
        });
          this.setState({ realm: realm });
        }).catch(error => {
            console.log(error);alert(error);return false;
        });
        
    }
    componentDidMount() {
    }
    createMeasurement() {
      this.props.navigation.navigate('createMeasurement');
    }
    showMeasurement(item) {
      //navigate
      this.props.navigation.navigate('editMeasurement', {item: item});
    }
    deleteMeasurement(item) {
        Realm.open({
        }).then(realm => {
        // realm.deleteRealmFile(this);
        realm.write(() => {
          console.log('item');
            realm.delete(item);
            alert('Deleted successfully');
        });
        this.setState({ realm });
        
        }).catch(error => {
            console.log(error);alert(error);return false;
        });
        // Realm.close();
    }
    confirmBeforeDelete(item) {
        let msg = 'Are you sure you want to delete this Client?';
        Alert.alert('Title', msg, [
          {text: 'No', onPress: () =>  {return false;}},
          {text: 'Yes', onPress: () => this.deleteMeasurement(item)}
        ], {cancelable: false});
    }
    filteredPersons() {console.log(this.state.persons);
      var persons = this.state.persons.filter(this.filteredPerson);
      return persons;
    }
    filteredPerson(person) {
      let lowercasefullname = this.person.fullname.toLowerCase();
      let lowercasesearch = this.search.toLowerCase();

      return lowercasefullname.indexOf(lowercasesearch) > -1;
    }
    _renderItem = ({item}) => (
      <MyListItem
        id={item.id}
        onPressItem={this._onPressItem}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
      />
    );
    displayDate(d) {
        var month = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
          'August', 'September', 'October', 'November', 'December'];
        return month[d.getMonth()] + ' ' + d.getDate() + ', '+ d.getFullYear();
    }

    render() {
      let persons = this.filteredPersons.bind(this);
      console.log(persons);
        return (
          <Container>
             <Header>
                <Body>
                <Title>{config.name }</Title>
                </Body>
                <Right />
            </Header>
            <Content>
              {/* <Item>
                  <Input placeholder='Search'  onChangeText={(search) => this.setState({search})} />
                  <Icon active name='search' />                  
              </Item> */}
              <List>
              <FlatList
                  data={this.state.persons}
                  keyExtractor= {(item, index) => item.id}
                  renderItem={({item, separators}) => (

                    <SwipeRow
                        rightOpenValue={-75}
                        body={
                          <TouchableHighlight
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <ListItem itemDivider button={true} onPress={() => this.showMeasurement(item)}>
                                  <Text>{item.fullname} - </Text>
                                  <Text  style={{fontSize:10}}> {this.displayDate(item.created_at)}</Text>
                            </ListItem>  
                          </TouchableHighlight>
                        }
                        right = {
                          <Button danger onPress={() => this.confirmBeforeDelete(item)}>
                              <Icon active name="trash" />
                          </Button>
                        }
                    />
                  )}
                />
                                  
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
      backgroundColor: '#ffffff'
    },
    createIconButton: {
       backgroundColor: '#3B5998',
       borderRadius:100,
       width:50,
       height:50,
       alignSelf: 'flex-end',
       marginBottom:10,
       marginRight: 10,
       alignItems: 'center',
       justifyContent: 'center', 
       
    },
    createIconText: {
      color:'#fff',
      fontSize: 38,
      fontWeight: 'bold',
    }
});