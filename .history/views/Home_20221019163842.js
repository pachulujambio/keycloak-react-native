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
      'http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=app://app/Login&id_token_hint=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlREJTcU1XOFdfTTM3VHFhRlJFWTFyQnJUbjRCb3hRaGpwNEJWV1ViRXljIn0.eyJleHAiOjE2NjYyMDgyNzksImlhdCI6MTY2NjIwNzk3OSwiYXV0aF90aW1lIjoxNjY2MjA3OTc2LCJqdGkiOiJhZWIzYmVhNC00OTBhLTRhYzgtODg1Yi1kN2ZjMWJlOTk3YWEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxODAvYXV0aC9yZWFsbXMva2V5Y2xvYWtMb2NhbCIsImF1ZCI6ImNsaWVudC1hcHAtbW9iaWxlIiwic3ViIjoiYThlYzM4YTEtZGU1ZC00YWM0LWJjZDAtOWM4YjQ1ZTQ0ODg4IiwidHlwIjoiSUQiLCJhenAiOiJjbGllbnQtYXBwLW1vYmlsZSIsIm5vbmNlIjoiMHpFVkdiLXNfZmxKMzdFTllWQnJ5USIsInNlc3Npb25fc3RhdGUiOiIxNzM1ZDkyNS04ZTE5LTQ3ZTYtODgwNC0wYjRjYzc0YWI1ZDUiLCJhdF9oYXNoIjoicXI5Yk0wWGoyWVctQUpDRjNPR0lMUSIsImFjciI6IjEiLCJzaWQiOiIxNzM1ZDkyNS04ZTE5LTQ3ZTYtODgwNC0wYjRjYzc0YWI1ZDUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImFkZHJlc3MiOnt9LCJuYW1lIjoiYWRtaW4gYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsImZhbWlseV9uYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSJ9.jOBRXWmVyObsnQ92rGpT_2Kd6xu60TbccftMjCdtlHErljmEtt2kGZApy3yw-3wyuM_bupzWx_leHDKOMNZk7qlHTXJGIPo3CPin2iqANRg9jE7aXAjWFBUJ-S_GpU3HmYjSacFuKy62QNgIYK2d3GXGISzo4jdIrS5SLqI52rEKa0OBZAVfgXzRTpsuRX32GTapOcKcAjvaop5_8lgyZAep8ioC30ohhX_xJSFK2fe0rXLPy1JH_HP1QZPJeuXOU9B8sgWyTyncUD5OE16WP8nySjZQseyg_qzipyFvHBZ1pCCbs-mNJ812PA7aRhmrrJ4-mHIfxparLcHN1fcwvg',
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
