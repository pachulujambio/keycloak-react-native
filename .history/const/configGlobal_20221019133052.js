const ConfigGlobal = {
    issuer: 'http://localhost:8180/auth/realms/keycloakLocal',
    clientId: 'client-app-mobile', //Cliente keycloak
    redirectUrl: 'app://app/LogIn', //Tiene que coincidir con la del cliente
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'phone', 'address'],
    dangerouslyAllowInsecureHttpRequests: true, //No pide certificado de seguridad para conectarse, usar solo en pruebas
};
export default ConfigGlobal;
