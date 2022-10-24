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
import logo from './assets/logo.png';
import fondo from './assets/fondo.png';
import slogan from './assets/slogan.png';

// Configuración de keycloak para todas las operaciones que se pueden hacer
// Al ser igual y necesaria en todos los métodos, conviene generar todo en una variable global o entidad
const config = {
  issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
  clientId: 'client-app-mobile',
  redirectUrl: '<YOUR_REDIRECT_URL>',
  scopes: ['openid profile email offline_access'],
};

//Función asíncrona para iniciar sesión
async function configAndLogIn() {
  try {
    const result = await authorize(config);
  } catch (error) {
    Alert(error);
  }
}

const App = () => {
  const [user, onChangeUser] = React.useState('Usuario no ingresado');
  const [password, onChangePassword] = React.useState(
    'Contraseña no ingresada',
  );

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
              {/* onPress={() =>
                Alert.alert(
                  'Su usario es: ' +
                    user +
                    '. Su contraseña es: ' +
                    password +
                    '.',
                )
              }> */}
              <Text style={styles.textButton}>Ingresar</Text>
            </TouchableOpacity>
            <Image source={slogan} style={styles.slogan} />
            {/* <Image source={sloganLargo} style={styles.sloganLargo} /> */}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    //justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    width: '100%',
    color: 'white',
    marginTop: 60,
    fontSize: 30,
    lineHeight: 65,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#C0C0C0',
    marginTop: 10,
    fontSize: 20,
  },
  slogan: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 40,
  },
  buttonLogIn: {
    backgroundColor: '#0f273d',
    width: 150,
    height: 40,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  textButton: {
    color: 'white',
    fontSize: 22,
  },
  sloganLargo: {
    width: '90%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 15,
  },
});

export default App;
