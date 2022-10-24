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
  <View style={styles.container}>
    <ImageBackground
      source={fondo}
      resizeMode="cover"
      style={styles.fondo}></ImageBackground>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    flex: 1,
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
});

export default App;
