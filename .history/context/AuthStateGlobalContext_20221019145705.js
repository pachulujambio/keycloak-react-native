//Librerias necesarías
import React, {useState, useEffect, useMemo} from 'react';

//Creador de la entidad con context
const authStateGlobalContext = React.createContext();

//Creador del "Provider" - Se utiliza para llamar el context en otros nodos (Pantallas, screen, views etc)
export function authStateGlobalContextProvider(props) {
  const authStateGlobalContextValue = useMemo(() => {
    return {
      authStateGlobalContext,;
    };
  }, [authStateGlobalContext]); //Propiedades que corrobora que cambien para crear nuevamente el objeto
}

return <authStateGlobalContext.Provider value={authStateGlobalContextValue}{...props} />

export function UseauthStateGlobalContext(params) {
    const contextConsume = React.useContext(authStateGlobalContext)
    if (!contextConsume) {
        throw new Error('authStateGlobal no funciona')
    }
}