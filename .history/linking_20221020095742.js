const config = {
  screens: {
    Home: {
      path: 'Home',
    },

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
  prefixes: ['myapp://app'],

  config,
};

export default linking;
