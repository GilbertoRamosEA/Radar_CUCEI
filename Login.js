//Importación de los objetos
import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //Declaración de variables
        codigo:"",
        nip:"",
    };
  }

  render() {
    //Programación en Javascript de los objetos

    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@Data', jsonValue)
        console.log("Se esta guardando el dato");
      } catch (e) {
        // saving error
      }
    }

    const btnClick = () => {
      let  _this = this;
      //this.props.navigation.navigate("Pantalla2");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
             // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);

            if(xhttp.responseText == 0){
              Alert.alert(
                "Usuario incorrecto",
                "Intentalo de nuevo",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }

            else{
              var recibe = xhttp.responseText;
              var datos = recibe.split(",");
              console.log(datos[2],datos[1]);
              storeData(datos);
              _this.props.navigation.navigate("Menu");
            }

          }
      };
      xhttp.open("GET", "Validacion.php"+this.state.codigo+"&nip="+this.state.nip,true);
      xhttp.send();



    }
    return (
      <View>

        <Image  style={styles.logoudg} source={require("./Imagenes/RadarCUCEIMain.png")}/>

        <TextInput style={styles.input} placeholder ="Codigo" placeholderTextColor={"gray"} keyboardType='numeric' onChangeText={codigo => this.setState({codigo})} />
        <TextInput style={styles.input} placeholder="NIP" placeholderTextColor={"gray"} secureTextEntry={true} onChangeText={nip => this.setState({nip})} />
        <Pressable style={styles.button} onPress={btnClick}>
              <Text style={styles.text}>Ingresar</Text>
        </Pressable>
      </View>
    );
  }
}
//Declaración de estilos
const styles = StyleSheet.create({
    btnEntrar:{
        width:100,
        height:80,
        marginTop: 30,
        alignSelf: "center"
    },
    input:{
        borderWidth: 2,
        boderColor: "black",
        marginTop: 20,
        width:300,
        height: 50,
        textAlign:"center",
        fontSize: 20,
        alignSelf: "center",
        color: "black",
    },
    logoudg:{
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 80,
        marginBottom: 80,
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
    textoudg:{
        fontSize: 40, 
        color: "black",
        textAlign:"center",
        marginTop: 40,
    },
    text: {
      fontSize: 20, 
      color: "black",
    }
})
