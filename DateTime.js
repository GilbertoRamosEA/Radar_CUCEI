import React, { useState } from "react"; 
import { Button, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DateTime() {
 
  const [datePicker, setDatePicker] = useState(false);
 
  const [date, setDate] = useState(new Date());
 
  const [timePicker, setTimePicker] = useState(false);
 
  const [time, setTime] = useState(new Date());

  const storeDataDate = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@DiaI', jsonValue)
      //console.log("Se esta guardando dato dia");
      //console.log(value)
    } catch (e) {
      // saving error
    }
  }
  

  const storeDataTime = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@HoraI', jsonValue)
      //console.log("Se esta guardando dato hora");
      //console.log(value)
    } catch (e) {
      // saving error
    }
  }

 
  function showDatePicker() {
    setDatePicker(true);
  };

  function showTimePicker() {
    setTimePicker(true);
  };
 
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    storeDataDate(value.toDateString());
  };
 
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
    storeDataTime(value.toLocaleTimeString());
  };
 
  return (
    <SafeAreaView>
      <View>
 
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
            style={styleSheet.datePicker}
          />
        )}
 
        {timePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onTimeSelected}
            style={styleSheet.datePicker}
          />
        )}

        <Text style={{ marginTop: 20 }}>Dia</Text>
        {!datePicker && (
            <View style={{ marginTop: 5 }}>
            <Pressable style={styleSheet.input} onPress={showDatePicker}>
              <Text style={{margin:10, fontSize: 20, color: "black",marginTop: 10,}}>{date.toDateString()}</Text>
            </Pressable>
  </View>
        )}
        <Text style={{ marginTop: 20 }}>Hora</Text>
        {!timePicker && (
          <View style={{ marginTop: 5 }}>
            <Pressable style={styleSheet.input} onPress={showTimePicker}>
              <Text style={{margin:10, fontSize: 20, color: "black", marginTop:10,}}>{time.toLocaleTimeString()}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
  
  
}

const styleSheet = StyleSheet.create({
 
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white'
  },
 
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },
 
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },

  input:{
    borderWidth: 2,
    boderColor: "black",
    width:300,
    height: 50,
    fontSize: 20,
    color: "black",
  },
 
});

/*storeDataDate(date.toDateString());*/