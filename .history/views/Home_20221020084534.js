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
  redirectUrl: 'app://app/*', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

const Home = ({navigation}) => {
  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    try {
      const AuthStateGlobal = await authorize(config);
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
      console.log(AuthStateGlobal.idToken);
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
      'http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=app://app/Home&id_token_hint=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlREJTcU1XOFdfTTM3VHFhRlJFWTFyQnJUbjRCb3hRaGpwNEJWV1ViRXljIn0.eyJleHAiOjE2NjYyMDg3MzgsImlhdCI6MTY2NjIwODQzOCwiYXV0aF90aW1lIjoxNjY2MjA4NDM1LCJqdGkiOiI5OTJhM2Y4OS04YmIzLTQ5NjAtOTE1Yy01ZTM2MjVhOGRjNjMiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODAvYXV0aC9yZWFsbXMva2V5Y2xvYWtMb2NhbCIsImF1ZCI6ImNsaWVudC1hcHAtbW9iaWxlIiwic3ViIjoiYmYwMzI5YTUtY2NhZS00NDg2LTg2NWEtNjA2ZWI4YWJiNWMyIiwidHlwIjoiSUQiLCJhenAiOiJjbGllbnQtYXBwLW1vYmlsZSIsIm5vbmNlIjoid19DVGFPMHVGYjBNQ0tFa2xIMkZEdyIsInNlc3Npb25fc3RhdGUiOiJhZWU4ZjBlNy05MDZhLTRjNWItODk5OC1lZTZkZGE2ODg4ZWMiLCJhdF9oYXNoIjoiT01BdzN6cjZZV1lXd2VpVnlTOGxZQSIsImFjciI6IjEiLCJzaWQiOiJhZWU4ZjBlNy05MDZhLTRjNWItODk5OC1lZTZkZGE2ODg4ZWMiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImFkZHJlc3MiOnt9LCJuYW1lIjoidXNlciB1c2VyIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidXNlciIsImdpdmVuX25hbWUiOiJ1c2VyIiwiZmFtaWx5X25hbWUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIn0.XghaYnfZVetem637JTgdGGgaBl9HKAx2DHIW_vR1kGTwV0XWhOpxE04dcSKC2XEbnkTTXSRdoIuMSHXGvkHstoHBvG6VvrRl0O72_QUrp2nsvSV73YWx05Eho2cdGvR_7D0CFVbNaWN8xD-j1qxgV9o7EU2IjVaqxlgqaptLmN70smSJFf5kVaMXk4FC7Ea59nySqXf7gzaMbkamBdwZKeH7lwPndB5p6zE4IptJiwt8lGdkfKNb93O4Ff5LGbkhzOlSeq6XtxNr7L6WxcAnEYNxl-oRhXR1GyaWRVbp_lJnTO9OS7bEwb0Ahcrf2RQxLZ1VjTZvY_NY-aiODpaUVw',
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
