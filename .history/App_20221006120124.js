import {React} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';
import logo from './assets/logo.png';
import fondo from './assets/fondo.png';

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
        <ScrollView>
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.container} backgroundColor="red">
              <Text style={styles.text}>Datos del usuario</Text>
              <TextInput
                style={styles.input}
                value={'Ingrese su Usuario'}
                opacity={0.5}
              />
              <TextInput
                style={styles.input}
                value={'Ingrese su Contraseña'}
                opacity={0.5}
              />
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
    //justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    marginTop: 30,
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
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#C0C0C0',
  },
});

export default App;
