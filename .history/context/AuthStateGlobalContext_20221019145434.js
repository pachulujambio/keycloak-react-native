//Librerias necesarías
import React, {useState, useEffect, useMemo} from 'react';

//Creador de la entidad con context
const AuthStateGlobalContext = React.createContext();

//Creador del "Provider" - Se utiliza para llamar el context en otros nodos (Pantallas, screen, views etc)
export function AuthStateGlobalContextProvider(props) {
  const AuthStateGlobalContextValue = useMemo(() => {
    return {
      AuthStateGlobalContext,;
    };
  }, [AuthStateGlobalContext]); //Propiedades que corrobora que cambien para crear nuevamente el objeto
}

return <AuthStateGlobalContext.Provider value={AuthStateGlobalContextValue}{...props} />

export function AuthStateGlobalContextUse(params) {
    
}