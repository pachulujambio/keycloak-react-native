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
import jwt_decode from 'jwt-decode';

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
  const [keycloakIdToken, setkeycloakIdToken] = useState(); //Constante para guardar el ID token y utilizarlo al cerrar sesión
  const [keycloakAccessToken, setkeycloakAccessToken] = useState(); //Costante para guardar el accessToken y utilizarlo para el rol
  //Decodificado de los datos del usuario
  const [jsonDecode, setJsonDecode] = useState();

  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    try {
      const AuthStateGlobal = await authorize(config); //Realiza el inicio de sesión e importa los datos de la misma a la app
      setkeycloakIdToken(AuthStateGlobal.idToken); //Seteo el idtoken
      setkeycloakAccessToken(AuthStateGlobal.accessToken); //Seteo el accessToken
      const jwtDecode = require('jwt-decode'); //Objeto requerido para la decodificación
      const decoded = jwt_decode(keycloakAccessToken); //Decofifico el accessToken y lo paso a json
      setJsonDecode(decoded); //Seteo el accessToken decodificado a una variable global para utilizar en el resto de la aplicación
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
      console.log(error);
    }
  }

  //Función asíncrona para cerrar sesión
  async function userLogOutButton() {
    Linking.openURL(
      `http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=myapp://app/Home&id_token_hint=${keycloakIdToken}`,
    );
    setJsonDecode(null); //Hardcode para eliminar los tokens
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
