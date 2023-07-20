import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DetallesReporte extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Nombre:"",
      Codigo:"",
      Incidencia: "",
      Entrada: "",
      Dia:"",
      Hora: "",
    };
    this.getData();
    this.getDataDate();
    this.getDataTime();
    this.getDataIncidencia();
    this.getDataEntrada();
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

  getDataIncidencia = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@Incidencia')
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        this.setState({Incidencia: data});
        //console.log(this.state.Hora);
      } 
      catch(e) {
      // error reading value
      }
  }

  getDataEntrada = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Entrada')
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({Entrada: data});
      //console.log(this.state.Hora);
    } 
    catch(e) {
    // error reading value
    }
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
        xhttp.open("GET", "AltaReporte.php?Codigo=" + this.state.Codigo + "&Nombre=" + this.state.Nombre + "&Dia=" + this.state.Dia  + "&Hora=" + this.state.Hora + "&Incidencia=" + this.state.Incidencia + "&Entrada=" + this.state.Entrada, true);
        xhttp.send();
    }

    const btnGuardar2 = () => {
        let  _this = this;
        _this.props.navigation.navigate("Menu");

        Alert.alert(
            "Reporte cancelado",
            " ",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
    }

    return (
        <View style={styles.PrincipalView}>
            <Text style={styles.TextT}>Detalles del Reporte</Text>
            <View style={styles.Textod2}>
                <Text>Nombre: </Text>
                <Text style={{fontSize: 20, color: "black",}}>{this.state.Nombre}</Text>
            </View>
            <View style={styles.Textod}>
                <Text>Codigo: </Text>
                <Text style={{fontSize: 20, color: "black",}}>{this.state.Codigo}</Text>
            </View>
            <View style={styles.Textod}>
                <Text>Dia: </Text>
                <Text style={{fontSize: 20, color: "black",}}>{this.state.Dia}</Text>
            </View>
            <View style={styles.Textod}>
                <Text>Hora: </Text>
                <Text style={{fontSize: 20, color: "black",}}>{this.state.Hora}</Text>
            </View>
            <View style={styles.Textod}>
                <Text>Incidencia: </Text>
                <Text style={{fontSize: 20, color: "black",}}>{this.state.Incidencia}</Text>
            </View>
            <View style={styles.Textod}>
                <Text>Entrada: </Text>
                <Text style={{fontSize: 20, color: "black",}}>{this.state.Entrada}</Text>
            </View>
            <Pressable style={styles.button} onPress={btnGuardar}>
                <Text style={styles.text}>Realizar Reporte</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={btnGuardar2}>
                <Text style={styles.text2}>Cancelar reporte</Text>
            </Pressable>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    PrincipalView:{
      marginTop: 70,
      margin:30,
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
      backgroundColor: 'orange',
      width: 168,
      height: 50,
      marginTop: 40,
      boderColor: "black",
    },

    button2: {
        backgroundColor: 'gray',
        width: 168,
        height: 50,
        marginTop: 20,
        boderColor: "black",
      },
    
    text: {
      fontSize: 20, 
      color: "black",
      margin: 10,
    },

    text2: {
        fontSize: 20, 
        color: "white",
        margin: 10,
      },
    
  
    TextT: {
      fontSize: 30, 
      color: "black",
      
    },
    Textod:{
      marginTop: 20,
    },
    Textod2:{
      marginTop: 45,
    },
    ViewStyles:{
      width:100,
      marginTop: 30,
      borderColor: "black",
    },
  })
