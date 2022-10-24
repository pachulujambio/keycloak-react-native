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

const App = () => {
  const [user, onChangeUser] = React.useState('Ingrese su usuario');
  const [password, onChangePassword] = React.useState('Ingrese su contraseña');

  return (
    <View style={styles.container}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
        <ScrollView>
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.container}>
              <Text style={styles.text}>Inicio de Sesión</Text>
              <TextInput
                style={styles.input}
                value={user}
                opacity={0.5}
                onChangeText={onChangeUser}
              />
              <TextInput
                style={styles.input}
                value={password}
                opacity={0.5}
                onChangeText={onChangePassword}
              />

              <TouchableOpacity
                style={styles.buttonLogIn}
                opacity={0.3}
                onPress={() =>
                  Alert.alert(
                    'Su usario es: ' + user + '. Su contraseña es: ' + password,
                  )
                }>
                <Text style={styles.textButton}>Ingresar</Text>
              </TouchableOpacity>
              <Image source={slogan} style={styles.slogan} />
            </View>
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
    fontSize: 30,
    lineHeight: 65,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 45,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#C0C0C0',
    marginTop: 15,
  },
  slogan: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 15,
  },
  buttonLogIn: {
    backgroundColor: '#C0C0C0',
    width: 150,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'black',
    fontSize: 25,
  },
});

export default App;
