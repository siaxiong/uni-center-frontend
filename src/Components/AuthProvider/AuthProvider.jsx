import React, {useState,useContext, useEffect} from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AuthProvider = function({children}){
    const [credentials, setCredentials] = useState(null);


    return <AuthContext.Provider value={{credentials, setCredentials}}>
        {children}
    </AuthContext.Provider>
}