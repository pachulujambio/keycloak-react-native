import React, {useState} from 'react';
import {
  Text,
  View,
  LoginStylesheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth';
import logo from './assets/logo.png';
import fondo from './assets/fondo.png';
import slogan from './assets/slogan.png';
import LoginStyles from './styles/logInStyle.js';

// Configuración de keycloak para todas las operaciones que se pueden hacer
// Al ser igual y necesaria en todos los métodos, conviene generar todo en una variable global o entidad
const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile', //Cliente keycloak
  redirectUrl: 'http://localhost:8081/index.js', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

// //Función asíncrona para iniciar sesión
// async function configAndLogIn() {
//   try {
//     const authState = await authorize(config);
//   } catch (error) {
//     Alert.alert('Failed to log in', error.message);
//     console.log(error.menssage);
//   }
// }

const Home = () => {
  return (
    <View>
      <Text>Inicio de Sesión</Text>
    </View>
  );
};

export default Home;
