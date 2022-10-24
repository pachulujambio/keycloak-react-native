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

// Configuración de keycloak para todas las operaciones que se pueden hacer
// Al ser igual y necesaria en todos los métodos, conviene generar todo en una variable global o entidad
const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile', //Cliente keycloak
  redirectUrl: 'app://app/Home', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

const Home = ({navigation}) => {
  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    try {
      const AuthStateGlobal = await authorize(config);
      console.log(AuthStateGlobal.idToken);
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
      console.log(AuthStateGlobal);
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }

  //Función asíncrona para cerrar sesión - Sin configurar
  async function userLogOutButton() {
    Linking.openURL(
      'http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=app://app&id_token_hint=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlREJTcU1XOFdfTTM3VHFhRlJFWTFyQnJUbjRCb3hRaGpwNEJWV1ViRXljIn0.eyJleHAiOjE2NjYyMDc3MTEsImlhdCI6MTY2NjIwNzQxMSwiYXV0aF90aW1lIjoxNjY2MjA3NDA4LCJqdGkiOiIzNDZiYTUyNi05MmIxLTQ2NTMtOWU3Ni02ZWJiYTA3YjBmOTgiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODAvYXV0aC9yZWFsbXMva2V5Y2xvYWtMb2NhbCIsImF1ZCI6ImNsaWVudC1hcHAtbW9iaWxlIiwic3ViIjoiYmYwMzI5YTUtY2NhZS00NDg2LTg2NWEtNjA2ZWI4YWJiNWMyIiwidHlwIjoiSUQiLCJhenAiOiJjbGllbnQtYXBwLW1vYmlsZSIsIm5vbmNlIjoiY1V5RTlTdGpraEJ5Y1FqTVhhdUk0ZyIsInNlc3Npb25fc3RhdGUiOiI1NTYyYjQzNC0wYjEyLTQ1MjQtYmM0MC0zNmIzYjZhYmUzYmIiLCJhdF9oYXNoIjoiVXZ5NDlZOXUtRVVybmt0YUFUZFBrZyIsImFjciI6IjEiLCJzaWQiOiI1NTYyYjQzNC0wYjEyLTQ1MjQtYmM0MC0zNmIzYjZhYmUzYmIiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImFkZHJlc3MiOnt9LCJuYW1lIjoidXNlciB1c2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlciIsImdpdmVuX25hbWUiOiJ1c2VyIiwiZmFtaWx5X25hbWUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0.J1lB4lEWkhORTsm4B4a8ZZJ9gztcGI5T050tG_ct3eTcynS1i8CvsI1Yg5NGO8eCu3tViD82zuVxuBlGxSP2BnDLvA7VCjkd1WcEGW60yaJNoa_TwDZpck0reb47sQOqnDDly8TQ0E1bPh-5eXD5wJYVqIZ4n6Z0IJMcGB9B2dx3Mgj_fNNq7H89VaiNpKRWpk-OzK73vg_to1Fa-kCsgcu9HMronlI9r6PqGqbkcFCVQP4mYjXztPO_6SKPyYxj78tkP9WQKfpOZj9fyta-D24ln0ypNHq7N99nmw4IxHtfq5iJZdM6JENR5DJL0cpR0gG6YbJ3cpGf5Tmfpa8QKg',
    );
    // Linking.openURL(
    //   'http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout',
    // );
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
            {/* <TouchableOpacity
              style={HomeStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => refreshToken()}>
              <Text style={HomeStyles.textButton}>Refresh Token</Text>
            </TouchableOpacity> */}
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
