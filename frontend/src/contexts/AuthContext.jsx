import { createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    let user = {
        name:'pyaesonepaing'
    };
    <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
}

export {AuthContext,AuthContextProvider}