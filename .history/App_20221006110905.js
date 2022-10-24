import {React} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import logo from './assets/logo.png';
import fondo from './assets/fondo.png';

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.text}>Datos del usuario</Text>
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
  },
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: 42,
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
});

export default App;
