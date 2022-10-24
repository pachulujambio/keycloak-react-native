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
  redirectUrl: 'app://app/LogIn', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

const Home = ({navigation}) => {
  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    try {
      const AuthStateGlobal = await authorize(config);
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
      console.log(AuthStateGlobal);
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }

  //Función asíncrona para cerrar sesión - Sin configurar
  async function userLogOutButton() {
    Linking.openURL(
      'http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=app://app/Home&id_token_hint=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlREJTcU1XOFdfTTM3VHFhRlJFWTFyQnJUbjRCb3hRaGpwNEJWV1ViRXljIn0.eyJleHAiOjE2NjYyMDU1ODcsImlhdCI6MTY2NjIwNTI4NywiYXV0aF90aW1lIjoxNjY2MjA0NjMyLCJqdGkiOiJkOWM0OTU1Ny05ODRhLTQ1NTQtOGRkMC0yNTAyZTRiZmM4YzQiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODAvYXV0aC9yZWFsbXMva2V5Y2xvYWtMb2NhbCIsImF1ZCI6WyJsb2NhbC1iYWNrZW5kIiwiYWNjb3VudCJdLCJzdWIiOiJiZjAzMjlhNS1jY2FlLTQ0ODYtODY1YS02MDZlYjhhYmI1YzIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjbGllbnQtYXBwLW1vYmlsZSIsIm5vbmNlIjoiUE9KcmFpaEFrRzNNR1lrWVE1RWdkQSIsInNlc3Npb25fc3RhdGUiOiI2MzhjODE3ZC0xNjZkLTRjMmQtODBiZS03NzlmYmY3OTM2ZGYiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInJlYWxtLXVzZXIiLCJkZWZhdWx0LXJvbGVzLWtleWNsb2FrbG9jYWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibG9jYWwtYmFja2VuZCI6eyJyb2xlcyI6WyJiYWNrZW5kLXVzZXIiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGFkZHJlc3MgZW1haWwgcGhvbmUgcHJvZmlsZSIsInNpZCI6IjYzOGM4MTdkLTE2NmQtNGMyZC04MGJlLTc3OWZiZjc5MzZkZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYWRkcmVzcyI6e30sIm5hbWUiOiJ1c2VyIHVzZXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyIiwiZ2l2ZW5fbmFtZSI6InVzZXIiLCJmYW1pbHlfbmFtZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20ifQ.YMV6OWViojQcQwYYwALtJq1bxc_v8kLJRZ5PDUEmMPiwcX8r91fUAF21JY4ZYzUrLa-wPLbTAPA84uEBvw-tm4qOQnJ8UkEbk1G8GOZoETAweBEQDH5H5gX-00onPajevMS6MbgkeJPFP7PXX1B4E7TWmFEG4e64p22hiddCf9BNozdeNzcpOnqAplPQUQwr1ayqbG_tqf45_vjBwfoiG8MBDN6EloO1b658PgD0ek7scRoh3xYuu-rWJwbHj_9CqJLkmvhh-mGCqai38-gl1BFexefZqnPk3OOXo35fAYK6SP3Ksl5Zdak5koEUG-adSXkuvBrfRQg5R9stIourgg',
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
