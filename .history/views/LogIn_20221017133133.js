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

const LogIn = () => {
  // const [user, onChangeUser] = React.useState('Usuario no ingresado');
  // const [password, onChangePassword] = React.useState(
  //   'Contraseña no ingresada',
  // );

  return (
    <View style={LoginStyles.container}>
      <ImageBackground
        source={fondo}
        resizeMode="cover"
        style={LoginStyles.fondo}>
        <ScrollView>
          <View style={LoginStyles.container}>
            {/* <Image source={slogan} style={LoginStyles.slogan} /> */}
            <Image source={logo} style={LoginStyles.logo} />
            <Text style={LoginStyles.text}>Sesión Iniciada con éxito</Text>
            <TouchableOpacity
              style={LoginStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => refreshToken()}>
              <Text style={LoginStyles.textButton}>Refresh Token</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={LoginStyles.buttonLogIn}
              opacity={0.5}
              onPress={() => userLogOutButton()}>
              <Text style={LoginStyles.textButton}>Desconectar</Text>
            </TouchableOpacity>
            <Image source={slogan} style={LoginStyles.slogan} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LogIn;