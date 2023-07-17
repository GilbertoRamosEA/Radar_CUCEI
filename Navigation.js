import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

//Screens
import INICIO from "./Inicio";
import REPORTE from "./Reporte";
import ESTADISTICAS from "./Estadisticas";
import LOGIN from "./Login";
import DETALLES from "./DetallesReporte"
import DATASCREEN from "./DataScreen.js";
import ACCIONES from "./DetallesAcciones";
import EDITAR from "./Editar";
import DETALLESE from "./DetallesEdicion";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs(){
    return (
        <Tab.Navigator 
            initialRouteName="Inicio"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                headerStyle:{
                    height: 60,
                    backgroundColor: 'orange',
                },
                tabBarStyle: {
                    height: 70,
                    backgroundColor: 'orange',
                    position: 'absolute',
                },
            }}
        >
            <Tab.Screen 
                name="Inicio" 
                component={INICIO}
                options={{
                    tabBarIcon: ({ color, size }) => (
                     <Icon
                        name="home-outline"
                        size = {35}
                        color = "black"
                     />
                    ),
                }}
            />
            <Tab.Screen 
                name="Crear Reporte" 
                component={REPORTE}
                options={{
                    tabBarIcon: ({ color, size }) => (
                     <Icon
                        name="add-circle-outline"
                        size = {35}
                        color = "black"
                     />
                    ),
                }}
            />
            <Tab.Screen 
                name="Estadisticas" 
                component={ESTADISTICAS}
                options={{
                    tabBarIcon: ({ color, size }) => (
                     <Icon
                        name="bar-chart-outline"
                        size = {35}
                        color = "black"
                     />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions = {{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Login" component={LOGIN}/>
                <Stack.Screen 
                    name="Menu" 
                    component={MyTabs}
                />
                <Stack.Screen name="Inicio" component={INICIO}/>
                <Stack.Screen name="Crear Reporte" component={REPORTE}/>
                <Stack.Screen name="Estadisticas" component={ESTADISTICAS}/>
                <Stack.Screen name="Detalles Reporte" component={DETALLES}/>
                <Stack.Screen name="DataScreen" component={DATASCREEN} />
                <Stack.Screen name="Detalles Acciones" component={ACCIONES}/>
                <Stack.Screen name="Editar" component={EDITAR}/>
                <Stack.Screen name="Detalles Edicion" component={DETALLESE}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
