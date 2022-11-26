import React, {useState, createContext,useContext, useEffect} from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

export const PathContext = createContext("");

export const ProtectedRoutes = ({children}) => {
    const { credentials, setCredentials } = useContext( AuthContext );
    const [path, setPath] = useState("off");

    useEffect(()=>{
        const cachedResult = JSON.parse(sessionStorage.getItem("/api/signin"));
        if(cachedResult != null){
            setCredentials(cachedResult)
        }

    },[])

    return credentials ? <PathContext.Provider value={{path, setPath}}>{<Outlet/>}</PathContext.Provider> : <Navigate to="/" replace />;
}