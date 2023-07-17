import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: '',
      region: null,
      latitudeDelta: 0.03,
      longitudeDelta: 0.02,
      destination: {
        latitude: 20.661663485326812,
        longitude: -103.33141951331567,
      },
      duration: null, // Tiempo estimado
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

  /*onDirectionFound = (result) => {
    const { duration } = result;
    this.setState({ duration });
  };*/

  onDirectionFound = (result) => {
    const { distance } = result;
    const walkingSpeed = 5; // Velocidad promedio de caminata en km/h
    const walkingTime = distance / walkingSpeed; // Tiempo estimado en horas
    const duration = walkingTime * 60; // Convertir a minutos
    this.setState({ duration });
  };

  render() {
    const { region, destination, duration } = this.state;

    return (
      <View style={styles.container}>
        {region && (
          <MapView style={styles.map} region={region}>
            <Marker
              draggable={false}
              coordinate={region}
              title={'Mi ubicación'}
              image={require('./Imagenes/Leoncito.png')}
            />
            <Marker
              draggable={false}
              coordinate={destination}
              title={'Estacion_Policia'}
              image={require('./Imagenes/Patrulla.png')}
            />
            <MapViewDirections
              origin={region}
              destination={destination}
              apikey={"AIzaSyDKro7kWLS72t0DSgjci_BmCAKuRJmujSo"}
              strokeWidth={4}
              strokeColor="blue"
              onReady={this.onDirectionFound} // Capturar tiempo estimado
            />
          </MapView>
        )}
        {duration && (
          <View style={styles.durationContainer}>
            <Text style={styles.durationText}>
              Estación de policia a {duration.toFixed(2)} minutos
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  durationContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  durationText: {
    color: 'white',
    fontSize: 16,
  },
});