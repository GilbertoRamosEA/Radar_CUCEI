import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, StatusBar,Button, SafeAreaView, Platform, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DateTime from './DateTime'

export default class Editar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Id: this.props.route.params.Id,
      Dia: this.props.route.params.Dia,
      Hora: this.props.route.params.Hora,
      Incidencia: this.props.route.params.Incidencia,
      Entrada: this.props.route.params.Entrada,
    };
  }

  render() {

    const btnGuardar = () => {
      let  _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          console.log("Petición enviada a servidor");
          if (this.readyState == 4 && this.status == 200) {
              // Typical action to be performed when the document is ready:
              console.log(xhttp.responseText);
              if(xhttp.responseText==="1")
              {
                  // alerta de exito
                  console.log("Agregado correctamente");
                  Alert.alert(
                    "Reporte registrado",
                    " ",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
                  _this.props.navigation.navigate("Login");
              }else{
                  // alerta de error
                  console.log("Error, no se pudo agregar");
                  
              }
          }
      };
      console.log("GET", "https://carreracucei3015.000webhostapp.com/Editar.php?Id=" + this.state.Id + "&Dia=" + this.state.Dia  + "&Hora=" + this.state.Hora + "&Incidencia=" + this.state.Incidencia + "&Entrada=" + this.state.Entrada, true);
      xhttp.open("GET", "https://carreracucei3015.000webhostapp.com/Editar.php?Id=" + this.state.Id + "&Dia=" + this.state.Dia  + "&Hora=" + this.state.Hora + "&Incidencia=" + this.state.Incidencia + "&Entrada=" + this.state.Entrada, true);
      xhttp.send();
    }

    const eliminarRegistro = () => {
      let  _this = this;

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            if(xhttp.responseText === "1"){
              console.log("Elemento eliminado con éxito.");
              Alert.alert(
                "Reporte Eliminado",
                "",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
              _this.props.navigation.navigate("Login");
            }
            else{
              console.log("No se pudo eliminar.");
            }
          }
      };
      xhttp.open("GET", "https://carreracucei3015.000webhostapp.com/BajaReporte.php?Id=" + this.props.route.params.Id, true);
      xhttp.send();
    }

    const Regresar = () => {
      let  _this = this;
      _this.props.navigation.navigate("Menu");
    }

    return (
      <ScrollView>
        <View style={styles.PrincipalView}>
          <Text style={styles.TextT}>Crear Reporte</Text>
          <View style={styles.Textod}>
            <Text>Dia</Text>
            <View style={styles.input}>
              <TextInput defaultValue = {this.state.Dia} editable={true} onChangeText={Dia => this.setState({Dia})} style={styles.inputT}/>
            </View>
          </View>
          <View style={styles.Textod}>
            <Text>Hora</Text>
            <View style={styles.input}>
              <TextInput defaultValue = {this.state.Hora} editable={true} onChangeText={Hora => this.setState({Hora})} style={styles.inputT}/>
            </View>
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
                <Text style={styles.text}>Editar</Text>
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
  inputT: {
    padding: 10,
    color: "black",
    marginLeft: 5,
  },
})