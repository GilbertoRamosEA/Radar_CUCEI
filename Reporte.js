import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, StatusBar,Button, SafeAreaView, Platform, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DateTime from './DateTime'

export default class Reporte extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Id: "53",
      Nombre:"",
      Codigo:"",
      Dia:"",
      Hora: "",
      Incidencia: "Acoso",
      Entrada: "Bulevard",
    };
    this.getData();
    this.getDataDate();
    this.getDataTime();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Data')
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({Nombre: data[2]});
      this.setState({Codigo: data[1]});
    } 
    catch(e) {
    // error reading value
    }
  }

  getDataDate = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@DiaI')
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({Dia: data});
      //console.log(this.state.Dia);
    } 
    catch(e) {
    // error reading value
    }
  }

  getDataTime = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@HoraI')
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({Hora: data});
      //console.log(this.state.Hora);
    } 
    catch(e) {
    // error reading value
    }
  }

  render() {

    const storeDataI = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Incidencia', jsonValue)
        console.log(value);
      } catch (e) {
        // saving error
      }
    }

    const storeDataE = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Entrada', jsonValue)
        console.log(value);
      } catch (e) {
        // saving error
      }
    }

    const btnGuardar = () => {
      let  _this = this;
      this.getDataDate();
      this.getDataTime();
      storeDataI(this.state.Incidencia);
      storeDataE(this.state.Entrada);
      _this.props.navigation.navigate("Detalles Reporte");
    }

    return (
      <ScrollView>
        <View style={styles.PrincipalView}>
          <Text style={styles.TextT}>Crear Reporte</Text>
          <View style={styles.Textod2}>
            <DateTime>
            </DateTime>
          </View>
          <View style={styles.Textod}>
            <Text>Incidencia</Text>
            <View style={styles.input}>
              <Picker selectedValue = {this.state.Incidencia} onValueChange = {Incidencia => this.setState({Incidencia})} styles={{color: 'black'}}>
                <Picker.Item label = "Acoso" value = "Acoso" />
                <Picker.Item label = "Agresion" value = "Agresion" />
                <Picker.Item label = "Asalto" value = "Asalto" />
                <Picker.Item label = "Intento de secuestro" value = "Intento de secuestro" />
              </Picker>
            </View>
          </View>
          <View style={styles.Textod}>
            <Text>Entrada</Text>
            <View style={styles.input}>
            <Picker selectedValue = {this.state.Entrada} onValueChange = {Entrada => this.setState({Entrada})} styles={{color: 'black'}}>
              <Picker.Item label = "Bulevard" value = "Bulevard" />
              <Picker.Item label = "Olimpica" value = "Olimpica" />
              <Picker.Item label = "Revolución" value = "Revolucion" />
            </Picker>
            </View>
          </View>
          <Pressable style={styles.button} onPress={btnGuardar}>
                <Text style={styles.text}>Registrar</Text>
          </Pressable>
          </View>
          <View>
          <View style={styles.Textod}>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  PrincipalView:{
    marginTop: 90,
    alignSelf: "center",
  },
  input:{
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 5,
    width:300,
    height: 50,
    fontSize: 20,
    alignSelf: "center",
    color: "black",
  },
  
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    width:300,
    height: 50,
    alignSelf: 'center',
    marginTop: 40,
    boderColor: "black",
  },
  
  text: {
    fontSize: 20, 
    color: "black",
  },

  TextT: {
    fontSize: 35, 
    color: "black",
    textAlign:"center",
  },
  Textod:{
    marginTop: 20,
  },
  Textod2:{
    marginTop: 55,
  },
  ViewStyles:{
    width:100,
    marginTop: 30,
    borderColor: "black",
  },
})