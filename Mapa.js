import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: '',
      region: null,
      latitudeDelta: 0.03,
      longitudeDelta: 0.02,
    };
  }

  async componentDidMount() {
    await this.requestLocationPermission();
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          },
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  async requestLocationPermission() {
    try {
      const result = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
        })
      );
      if (result === 'granted') {
        console.log('Permisos de ubicación concedidos');
        this.setState({ locationPermission: 'granted' });
        // Continuar con la lógica de la aplicación
      } else {
        console.log('Permisos de ubicación denegados');
        this.setState({ locationPermission: 'denied' });
        // Manejar el caso en que los permisos sean denegados
      }
    } catch (error) {
      console.log('Error al solicitar permisos de ubicación', error);
    }
  }

  render() {
    const { region } = this.state;

    return (
      <View style={styles.container}>
        {region && (
          <MapView
            style={styles.map}
            region={region}
          >
            <Marker 
              draggable={false}
              coordinate={region}
              title={"Mi ubicación"}
              image={require('./Imagenes/Leoncito.png')}
            />
            <Marker 
              draggable={false}
              //20.661663485326812, -103.33141951331567
              coordinate={{ latitude: 20.661663485326812, longitude: -103.33141951331567 }} 
              title={"Estacion_Policia"}
              image={require('./Imagenes/Patrulla.png')}
            />
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  },
});

        <MapViewDirections
              origin={region}
              destination={destination}
              apikey={"YOUR_API_KEY"}
              strokeWidth={4}
              strokeColor="blue"
              onReady={this.onDirectionFound} // Funcion de de estimación de tiempo
            />
          </MapView>