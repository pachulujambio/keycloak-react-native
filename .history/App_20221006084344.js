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
  <View>
    <ImageBackground source={fondo} resizeMode="cover" style={styles.fondo}>
      <ScrollView>
        <Image source={logo} />
      </ScrollView>
    </ImageBackground>
  </View>;
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  scroll: {
    fontSize: 24,
    fontWeight: '600',
  },
  fondo: {
    width: '100%',
    height: '100%',
  },
});

export default App;
