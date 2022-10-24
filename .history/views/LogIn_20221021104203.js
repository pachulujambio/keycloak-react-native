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
  Linking,
} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth';
import logo from '../assets/logo.png';
import fondo from '../assets/fondo.png';
import slogan from '../assets/slogan.png';
import LoginStyles from '../styles/logInStyle.js';

const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile', //Cliente keycloak
  redirectUrl: 'app://app/LogIn', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

const LogIn = ({navigation}) => {

  //Constantes globales de la vista
  const [keycloakIdToken, setkeycloakIdToken] = useState(); //Guarda el ID token y utilizarlo al cerrar sesión
  const [keycloakAccessToken, setkeycloakAccessToken] = useState(); //Guarda el accessToken y utilizarlo para el rol
  const [jsonDecode, setJsonDecode] = useState(null); //Almacena el json con los datos del usuario
  const [stateUser, setStateUser] = useState('Desconectado'); //String para indicar el estado de la conexión y nombre del usuario
  const [rollUserConnect, setRollUserConnect] = useState('undefined'); //Constata el roll del usuario conectado

  setkeycloakAccessToken(AuthStateGlobal.accessToken); //Seteo el accessToken
  setkeycloakIdToken(AuthStateGlobal.idToken), //Seteo el idtoken
  const jwtDecode = require('jwt-decode'); //Objeto requerido para la decodificación
  const decoded = jwt_decode(keycloakAccessToken); //Decofifico el accessToken y lo paso a json
  setJsonDecode(decoded); //Seteo el accessToken decodificado a una variable global para utilizar en el resto de la aplicación
  setStateUser('Usuario conectado: ' + jsonDecode.name); //setea el nombre del usuario a conectado

  //Función asíncrona para cerrar sesión
  async function userLogOutButton() {
    Linking.openURL(
      `http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=myapp://app/Home&id_token_hint=${keycloakIdToken}`,
    );
    setStateUser('Desconectado');
    setJsonDecode(null); //Hardcode para eliminar los tokens
  }
  return (
    <View style={LoginStyles.container}>
      <ImageBackground
        source={fondo}
        resizeMode="cover"
        style={LoginStyles.fondo}>
        <ScrollView>
          <View style={LoginStyles.container}>
            <Image source={logo} style={LoginStyles.logo} />
            <Text style={LoginStyles.text}>Sesión Iniciada con éxito</Text>
            <Text style={HomeStyles.text}>{stateUser}</Text>
            <TouchableOpacity
              style={LoginStyles.buttons}
              opacity={0.5}
              onPress={() => userLogOutButton()}>
              <Text style={LoginStyles.textButton}>Desconectar</Text>
            </TouchableOpacity>
            <Image source={slogan} style={LoginStyles.slogan} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LogIn;