import React, {Component} from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: this.props.route.params.Id,
      Dia: this.props.route.params.Dia,
      Hora: this.props.route.params.Hora,
      Incidencia:  this.props.route.params.Incidencia,
      Entrada: this.props.route.params.Entrada,
    };
  }

  render() {

    const storeDataId = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Id', jsonValue)
        console.log(value);
      } catch (e) {
        // saving error
      }
    }

    const storeDataDia = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Dia', jsonValue)
        console.log(value);
      } catch (e) {
        // saving error
      }
    }

    const storeDataHora = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Hora', jsonValue)
        console.log(value);
      } catch (e) {
        // saving error
      }
    }

    const storeDataIncidencia = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Incidencia', jsonValue)
        console.log(value);
      } catch (e) {
        // saving error
      }
    }

    const storeDataEntrada = async (value) => {
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
      xhttp.open("GET", "Editar.php?Id=" + this.state.Id + "&Dia=" + this.state.Dia  + "&Hora=" + this.state.Hora + "&Incidencia=" + this.state.Incidencia + "&Entrada=" + this.state.Entrada, true);
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
      xhttp.open("GET", "BajaReporte.php?Id=" + this.props.route.params.Id, true);
      xhttp.send();
    }

    const Regresar = () => {
      let  _this = this;
      _this.props.navigation.navigate("Menu");
    }

    return (
      <View>
        <View style={styles.PrincipalView}>
            <Text style={styles.TextT}>Detalles del Reporte</Text>

            <View style={styles.Textod2}>

              <Text>Dia:</Text>
              <View style={styles.inputD2}>
                <TextInput value = {this.state.Dia} onChangeText={Dia => this.setState({Dia})} style={styles.inputT}/>
              </View>
            </View>

            <View style={styles.Textod}>

              <Text>Hora:</Text>
              <View style={styles.inputD2}>
                <TextInput value = {this.state.Hora} onChangeText={Hora => this.setState({Hora})} style={styles.inputT}/>
              </View>
            </View>

            <View style={styles.Textod}>

              <Text>Incidencia:</Text>
              <View style={styles.inputD2}>
                <Picker selectedValue = {this.state.Incidencia2} onValueChange = {Incidencia2 => this.setState({Incidencia2})} styles={{color: 'black'}}>
                  <Picker.Item label = "Acoso" value = "Acoso" />
                  <Picker.Item label = "Agresion" value = "Agresion" />
                  <Picker.Item label = "Asalto" value = "Asalto" />
                  <Picker.Item label = "Intento de secuestro" value = "Intento de secuestro" />
                </Picker>
              </View>
            </View>

            <View style={styles.Textod}>

              <Text>Entrada:</Text>
              <View style={styles.inputD2}>
                <Picker selectedValue = {this.state.Entrada2} onValueChange = {Entrada2 => this.setState({Entrada2})} styles={{color: 'black'}}>
                  <Picker.Item label = "Bulevard" value = "Bulevard" />
                  <Picker.Item label = "Olimpica" value = "Olimpica" />
                  <Picker.Item label = "Revolución" value = "Revolucion" />
                </Picker>
              </View>
            </View>

            <Pressable style={styles.buttonA} onPress={btnGuardar}>
                <Text style={styles.text}>Editar reporte</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={eliminarRegistro}>
                <Text style={styles.text}>Eliminar reporte</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={Regresar}>
                <Text style={styles.text2}>Cancelar </Text>
            </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nombre: {
    fontSize: 28,
    textAlign: 'center',
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  imagen:{
    width: 170,
    height: 320,
    resizeMode: "contain",
    alignSelf: "center"
  },
  PrincipalView:{
    marginTop: 70,
    margin:30,
  },

  buttonA: {
    backgroundColor: 'orange',
    width: 168,
    height: 50,
    marginTop: 40,
    boderColor: "black",
  },

  button: {
    backgroundColor: 'orange',
    width: 168,
    height: 50,
    marginTop: 20,
    boderColor: "black",
  },

  button2: {
      backgroundColor: 'gray',
      width: 168,
      height: 50,
      marginTop: 20,
      boderColor: "black",
      alignItems: 'center',
      justifyContent: 'center',
    },

  inputT: {
    padding: 10,
    color: "black",
    marginLeft: 5,
  },
  
  text: {
    fontSize: 20, 
    color: "black",
    margin: 10,
  },

  text2: {
      fontSize: 20, 
      color: "white",
      margin: 5,
    },

  inputD:{
  borderWidth: 2,
  borderColor: 'black',
  marginTop: 5,
  width:300,
  height: 50,
  fontSize: 20,
  backgroundColor: 'lightgray',
  },

  inputD2:{
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 5,
    width:300,
    height: 50,
    fontSize: 20,
  },
  
  Textod1:{
    marginTop: 40,
  },

  TextT: {
    fontSize: 30, 
    color: "black",
    
  },
  Textod:{
    marginTop: 20,
  },
  Textod2:{
    marginTop: 30,
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

  ViewStyles:{
    width:100,
    marginTop: 30,
    borderColor: "black",
  },
});

  /*
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
      xhttp.open("GET", "https://carreracucei3015.000webhostapp.com/Editar.php?Id=" + this.state.Id + "&Dia=" + this.state.Dia  + "&Hora=" + this.state.Hora + "&Incidencia=" + this.state.Incidencia + "&Entrada=" + this.state.Entrada, true);
      console.log("GET", "https://carreracucei3015.000webhostapp.com/Editar.php?Id=" + this.state.Id + "&Dia=" + this.state.Dia  + "&Hora=" + this.state.Hora + "&Incidencia=" + this.state.Incidencia + "&Entrada=" + this.state.Entrada, true);
      xhttp.send();
    }
  */
