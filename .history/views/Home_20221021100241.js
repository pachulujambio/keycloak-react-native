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
  //Constantes globales de la vista
  const [keycloakIdToken, setkeycloakIdToken] = useState(); //Guarda el ID token y utilizarlo al cerrar sesión
  const [keycloakAccessToken, setkeycloakAccessToken] = useState(); //Guarda el accessToken y utilizarlo para el rol
  const [jsonDecode, setJsonDecode] = useState(null); //Almacena el json con los datos del usuario
  const [stateUser, setStateUser] = useState('Desconectado'); //String para indicar el estado de la conexión y nombre del usuario
  const [rollUserConnect, setRollUserConnect] = useState('undefined'); //Constata el roll del usuario conectado

  //Corrobora si hay un usuario conectado
  function isConnect() {
    const isConnectResult = {jsonDecode} !== null ? true : false;
    return isConnectResult;
  }

  //Función asíncrona para iniciar sesión
  async function configAndLogIn() {
    //Promesa para esperar el idToken y el accessToken
    const promiseSetToken = new Promise((resolve, reject) => {
      if (AuthStateGlobal != null) {
        resolve('Variables asignadas');
      } else {
        reject('Variables no asignadas');
      }
    });

    try {
      const AuthStateGlobal = await authorize(config); //Realiza el inicio de sesión e importa los datos de la misma a la app

      promiseSetToken
        .then(result => {
          setkeycloakIdToken(AuthStateGlobal.idToken); //Seteo el idtoken
          setkeycloakAccessToken(AuthStateGlobal.accessToken); //Seteo el accessToken
        })
        .catch(err => {
          console.log('No es posible setear las variables');
        });

      const jwtDecode = require('jwt-decode'); //Objeto requerido para la decodificación

      //================================FALTA PROMESA
      const decoded = jwt_decode(keycloakAccessToken); //Decofifico el accessToken y lo paso a json

      //================================FALTA PROMESA
      setJsonDecode(decoded); //Seteo el accessToken decodificado a una variable global para utilizar en el resto de la aplicación

      //================================FALTA PROMESA
      setStateUser('Usuario conectado: ' + jsonDecode.name); //setea el nombre del usuario a conectado
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
    setStateUser('Desconectado');
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
            <Text style={HomeStyles.text}>{stateUser}</Text>
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
