import React, {useState} from 'react';
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
import {authorize, refresh} from 'react-native-app-auth';
import logo from '../assets/logo.png';
import fondo from '../assets/fondo.png';
import slogan from '../assets/slogan.png';
import HomeStyles from '../styles/homeStyle.js';
import AuthState from '../const/ConfigGlobal';

// Configuración de keycloak para todas las operaciones que se pueden hacer
// Al ser igual y necesaria en todos los métodos, conviene generar todo en una variable global o entidad
const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile', //Cliente keycloak
  redirectUrl: 'app://app/LogIn', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

const Home = ({navigation}) => {

  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    try {
      AuthStateGlobal = await authorize(config);
      console.log(AuthStateGlobal);
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }

  //Función asíncrona para refrescar el token
  async function refreshToken() {
    try {
      const refreshedState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }

  //Función asíncrona para cerrar sesión - Sin configurar
  async function userLogOutButton() {
    Linking.openURL('http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout');
    // navigation.navigate('LogOut');
  }

  return (
    <View style={HomeStyles.container}>
      <ImageBackground
        source={fondo}
        resizeMode="cover"
        style={HomeStyles.fondo}>
        <ScrollView>
          <View style={HomeStyles.container}>
            {/* <Image source={slogan} style={HomeStyles.slogan} /> */}
            <Image source={logo} style={HomeStyles.logo} />
            <Text style={HomeStyles.text}>Inicio de Sesión</Text>
            <TouchableOpacity
              style={HomeStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => configAndLogIn()}>
              <Text style={HomeStyles.textButton}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={HomeStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => refreshToken()}>
              <Text style={HomeStyles.textButton}>Refresh Token</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={HomeStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => userLogOutButton()}>
              <Text style={HomeStyles.textButton}>Desconectar</Text>
            </TouchableOpacity>
            <Image source={slogan} style={HomeStyles.slogan} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Home;
