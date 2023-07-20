import React, {Component} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight, Button} from 'react-native';

export default class Estadisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Reportes: [],
    };
  }

  componentDidMount() {
    let _this = this;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        var temp = JSON.parse(xhttp.responseText);
        _this.setState({Reportes: temp});
        
      }
    };

    xhttp.open(
      'GET',
      `MostrarReportes.php`,
      true,
    );

    xhttp.send();
  }

  render() {

    const gotoDataScreen = item => {
      this.props.navigation.navigate('DataScreen', {
        Id : item.Id,
        Nombre: item.Nombre,
        Codigo: item.Codigo,
        Dia: item.Dia,
        Hora: item.Hora,
        Incidencia: item.Incidencia,
        Entrada: item.Entrada,
      });
    };

    const ui = ({item}) => {
      return (
          <TouchableHighlight
          onPress={() => {
            gotoDataScreen(item);
          }}>
          <View style={styles.user}>
            <Text style={{fontSize: 20, color: "black", margin: 2,}}>Dia: {item.Dia}</Text>
            <Text style={{fontSize: 20, color: "black", margin: 2,}}>Hora: {item.Hora}</Text>
            <Text style={{fontSize: 20, color: "black", margin: 2,}}>Incidencia: {item.Incidencia}</Text>
            <Text style={{fontSize: 20, color: "black", margin: 2,}}>Entrada: {item.Entrada}</Text>
          </View>
        </TouchableHighlight>
      );
    };


    return (
      <View>
        <Text style={styles.TextT}> Historial de Reportes </Text>
        <FlatList
          style={{margin: 18, borderwidth: 1, borderColor: 'black'}}
          data={this.state.Reportes}
          renderItem={ui}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  TextT: {
    fontSize: 30, 
    color: "black",
    marginTop: 40,
    margin: 10,
  },
});
