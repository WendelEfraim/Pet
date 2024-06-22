import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

// eslint-disable-next-line react/prop-types
function UserProvider({children}) {
    const {authenticated, register} = useAuth()

    return<Context.Provider value={{authenticated, register}}>{children}</Context.Provider>
    
}

export {Context, UserProvider}