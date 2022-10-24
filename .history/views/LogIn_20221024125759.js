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
  const keycloakAccessToken = AuthStateGlobal.accessToken; //Guarda el accessToken y utilizarlo para el rol
  const keycloakIdToken = AuthStateGlobal.idToken; //Guarda el ID token y utilizarlo al cerrar sesión
  const jwtDecode = require('jwt-decode'); //Objeto requerido para la decodificación
  const [jsonDecode, setJsonDecode] = useState(); //Almacena el json con los datos del usuario
  const [nameUser, setnameUser] = useState('Desconectado'); //String para indicar el estado de la conexión y nombre del usuario
  const [isAdmin, setisAdmin] = useState(null); //Constata el roll del usuario conectado

  // //Configuración para trabajar con los datos del usuario evitando errores con datos nulos
  if (jsonDecode == null) {
    const decoded = jwt_decode(keycloakAccessToken); //Decofifico el accessToken y lo paso a json
    setJsonDecode(decoded); //Seteo el accessToken decodificado a una variable global para utilizar en el resto de la aplicación
  }
  if (nameUser == 'Desconectado' && jsonDecode != null) {
    setisAdmin(jsonDecode.realm_access.roles.includes('realm-admin')); //Setea si el usuario es o no es admin
    setnameUser('Usuario conectado: ' + jsonDecode.name); //setea el nombre del usuario a conectado
    console.log('NOMBRE DEL USUARIO           ' + nameUser);
    console.log(jsonDecode);
  }
  if (isAdmin == null && jsonDecode != null) {
    setisAdmin(jsonDecode.realm_access.roles.includes('realm-admin')); //Setea si el usuario es o no es admin
    console.log(isAdmin); //Sigue dando null
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
            <Text style={LoginStyles.textUser}>{nameUser}</Text>
            <Text style={LoginStyles.textUser}>{isAdmin}</Text>
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
