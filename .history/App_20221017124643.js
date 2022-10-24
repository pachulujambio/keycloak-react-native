import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth';
import logo from './assets/logo.png';
import fondo from './assets/fondo.png';
import slogan from './assets/slogan.png';
import * from './styles/logInstyle'

// Configuración de keycloak para todas las operaciones que se pueden hacer
// Al ser igual y necesaria en todos los métodos, conviene generar todo en una variable global o entidad
const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile', //Cliente keycloak
  redirectUrl: 'http://localhost:8081/index.js', //Tiene que coincidir con la del cliente
  additionalParameters: {},
  scopes: ['openid', 'profile', 'email', 'phone', 'address'],
  dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};

//Función asíncrona para iniciar sesión
async function configAndLogIn() {
  try {
    const authState = await authorize(config);
  } catch (error) {
    Alert.alert('Failed to log in', error.message);
    console.log(error.menssage);
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
  Alert.alert('Botón no configurado', 'Intente mas tarde');
}

const App = () => {
  // const [user, onChangeUser] = React.useState('Usuario no ingresado');
  // const [password, onChangePassword] = React.useState(
  //   'Contraseña no ingresada',
  // );

  return (
    <View style={styles.container}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
        <ScrollView>
          <View style={styles.container}>
            {/* <Image source={slogan} style={styles.slogan} /> */}
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Inicio de Sesión</Text>
            {/* <TextInput
              style={styles.input}
              opacity={0.5}
              onChangeText={onChangeUser}
              placeholder="Usuario"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              opacity={0.5}
              onChangeText={onChangePassword}
              placeholder="Contraseña"
            /> */}
            <TouchableOpacity
              style={styles.buttonLogIn}
              opacity={0.5}
              onPress={() => configAndLogIn()}>
              <Text style={styles.textButton}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLogIn}
              opacity={0.5}
              onPress={() => refreshToken()}>
              <Text style={styles.textButton}>Refresh Token</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonLogIn}
              opacity={0.5}
              onPress={() => userLogOutButton()}>
              <Text style={styles.textButton}>Desconectar</Text>
            </TouchableOpacity>
            <Image source={slogan} style={styles.slogan} />
            {/* <Image source={sloganLargo} style={styles.sloganLargo} /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};



export default App;
