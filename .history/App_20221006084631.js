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
  <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
    <Text style={styles.text}>Inside</Text>
  </ImageBackground>
</View>

  <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
    {/* <ScrollView>
      <Image source={logo} />
    </ScrollView> */}
  </ImageBackground>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    fontSize: 24,
    fontWeight: '600',
  },
  fondo: {
    flex: 1,
    justifyContent: "center"
  },
});

export default App;
