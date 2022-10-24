const config = {
  screens: {
    Home: 'Home',

    LogIn: {
      path: 'LogIn',
      // parse: {
      //   id: (id) => `${id}`,
      // },
    },

    LogOut: {
      path: 'LogOut',
    },
  },
};

const linking = {
  prefixes: ['app://app'],

  config,
};

export default linking;
