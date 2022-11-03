import React, {useContext, useEffect} from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) => {
    const { credentials, setCredentials } = useContext( AuthContext );

    useEffect(()=>{

    }, [credentials])

    useEffect(()=>{
        const cachedResult = JSON.parse(sessionStorage.getItem("/api/signin"));
        if(cachedResult != null){
            setCredentials(cachedResult)
        }

    },[])

    return credentials ? <Outlet/> : <Navigate to="/" replace />;
}