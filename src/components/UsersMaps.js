import React from 'react';
import { View,StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const usersMaps = (props) => {
    let userLocationMarker = null; 
     if( props.userLocationMarker ) 
     {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation} />
     }
    const userMarkers = props.usersPlaces.map(userPlace => (
    <MapView.Marker coordinate={userPlace} key={userPlace.id} />))
    return (
        <View style={styles.mapContainer}>
            <MapView  style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            region = {props.userLocation}
            />
            {userLocationMarker}
            {userMarkers}
        </View>

    );
};

const styles = StyleSheet.create({
    mapContainer: {
        margin: 20,
        width: '100%',
        height: 200
    },
    map:{
        width: '100%',
        height: '100%'
    }
})

export default usersMaps;