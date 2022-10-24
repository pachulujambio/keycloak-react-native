import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  HomeStylesheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth'; //Librería necesaria para trabajar con keycloak
import jwt_decode from 'jwt-decode'; //Libreria necesaría para trabajar con jwt
import logo from '../assets/logo.png';
import fondo from '../assets/fondo.png';
import slogan from '../assets/slogan.png';
import HomeStyles from '../styles/homeStyle.js';

// Configuración de keycloak para todas las operaciones que se pueden hacer al ser igual y necesaria en todos los métodos, conviene generar todo en una variable global o entidad
const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile', //Cliente keycloak
  redirectUrl: 'myapp://app/Home', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: [
    'openid',
    'profile',
    'email',
    'phone',
    'address',
    'offline_access',
    'roles',
  ],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad (https) para conectarse, usar solo en pruebas
};

const Home = ({navigation}) => {
  //Corrobora si hay un usuario conectado
  function isConnect() {
    const isConnectResult = {jsonDecode} !== null ? true : false;
    return isConnectResult;
  }

  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    try {
      const AuthStateGlobal = await authorize(config); //Realiza el inicio de sesión e importa los datos de la misma a la app
      if (AuthStateGlobal != null) {
        navigation.navigate('LogIn');
      }
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
      console.log(error);
    }
  }

  return (
    <View style={HomeStyles.container}>
      <ImageBackground
        source={fondo}
        resizeMode="cover"
        style={HomeStyles.fondo}>
        <ScrollView>
          <View style={HomeStyles.container}>
            <Image source={logo} style={HomeStyles.logo} />
            <Text style={HomeStyles.text}>Inicio de Sesión</Text>
            <TouchableOpacity
              style={HomeStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => configAndLogIn()}>
              <Text style={HomeStyles.textButton}>Ingresar</Text>
            </TouchableOpacity>
            <Image source={slogan} style={HomeStyles.slogan} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Home;
