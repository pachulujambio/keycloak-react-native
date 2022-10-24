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
import {authorize, refresh} from 'react-native-app-auth'; //Librería necesaria para trabajar con keycloak
import jwt_decode from 'jwt-decode'; //Libreria necesaría para trabajar con jwt
import logo from '../assets/logo.png';
import fondo from '../assets/fondo.png';
import slogan from '../assets/slogan.png';
import LoginStyles from '../styles/logInStyle.js';

const LogIn = ({route, navigation}) => {
  //Constantes globales de la vista
  const {AuthStateGlobal} = route.params;
  const [keycloakIdToken, setkeycloakIdToken] = useState(); //Guarda el ID token y utilizarlo al cerrar sesión
  const [keycloakAccessToken, setkeycloakAccessToken] = useState(); //Guarda el accessToken y utilizarlo para el rol
  const [jsonDecode, setJsonDecode] = useState(); //Almacena el json con los datos del usuario
  const [stateUser, setStateUser] = useState('Desconectado'); //String para indicar el estado de la conexión y nombre del usuario
  const [rollUserConnect, setRollUserConnect] = useState('undefined'); //Constata el roll del usuario conectado
  const jwtDecode = require('jwt-decode'); //Objeto requerido para la decodificación
  const isAdmin = null;

  //Configuración para trabajar con los datos del usuario evitando errores con datos nulos
  if (keycloakAccessToken == null) {
    setkeycloakAccessToken(AuthStateGlobal.accessToken); //Seteo el accessToken
    setkeycloakIdToken(AuthStateGlobal.idToken); //Seteo el idtoken
  }
  if (keycloakAccessToken != null && jsonDecode == null) {
    const decoded = jwt_decode(keycloakAccessToken); //Decofifico el accessToken y lo paso a json
    setJsonDecode(decoded); //Seteo el accessToken decodificado a una variable global para utilizar en el resto de la aplicación
  }
  if (stateUser == 'Desconectado' && jsonDecode != null) {
    setStateUser('Usuario conectado: ' + jsonDecode.name); //setea el nombre del usuario a conectado
    const isAdmin = jsonDecode.realm_access.roles.includes('realm-admin');
    console.log(isAdmin);
  }

  // Función asíncrona para cerrar sesión
  async function userLogOutButton() {
    Linking.openURL(
      `http://localhost:8180/auth/realms/keycloakLocal/protocol/openid-connect/logout?post_logout_redirect_uri=myapp://app/Home&id_token_hint=${keycloakIdToken}`,
    ); //Se dirije al endpoint de keycloak para el logOut
    navigation.popToTop(); //Retorna la app a la primer view del linking
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
            <Text style={LoginStyles.textUser}>{stateUser}</Text>
            <TouchableOpacity
              style={LoginStyles.buttons}
              opacity={0.5}
              onPress={() => userLogOutButton()}>
              <Text style={LoginStyles.textButton}>Desconectar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={LoginStyles.buttons}
              opacity={0.5}
              onPress={() => test()}>
              <Text style={LoginStyles.textButton}>prueba</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={LoginStyles.buttons}
              opacity={0.5}
              onPress={() => test2()}>
              <Text style={LoginStyles.textButton}>Boton Admin</Text>
            </TouchableOpacity>
            <Image source={slogan} style={LoginStyles.slogan} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LogIn;
