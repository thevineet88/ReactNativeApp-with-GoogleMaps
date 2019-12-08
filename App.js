import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

import FetchLocation from './src/components/fetchLocation'
import UsersMaps from './src/components/UsersMaps';

export default class App extends React.Component {

state = {
  userLocation : null,
  usersPlaces: []
}

   getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition( (position) => {
      this.setState({
        userLocation:{
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421 
        }
      });
      fetch('https://myreactapp-261406.firebaseio.com/places.json',{
        method:'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    },(err) => {
      console.log(err);
    })
  }

  getUserPlacesHandler = () => {

    fetch('https://myreactapp-261406.firebaseio.com/places.json')
    .then(res => res.json())
    .then(parsedRes => {
      const placesArr = [];
      for (const key in parsedRes) 
      {
        placesArr.push({
          latitude: parsedRes[key].latitude,
          longitude: parsedRes[key].longitude,
          id: key
        })
      }
      this.setState({
        usersPlaces: placesArr
      });
    })
    .catch(err => console.log(err));
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
        <Button title="Get User Location" onPress={this.getUserPlacesHandler}/>
        </View>
        <FetchLocation  getLocation={this.getLocationHandler} />
        <UsersMaps userLocation={this.state.userLocation}
        usersPlaces={this.state.usersPlaces}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
