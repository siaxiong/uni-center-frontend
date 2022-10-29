import React, { useContext, useEffect} from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./Components/AuthProvider/AuthContext";
import { AuthProvider } from "./Components/AuthProvider/AuthProvider";
import { Nav } from "./Components/Nav/Nav";

export const App = () => {
    const {credentials} = useContext(AuthContext)
    
    return <Outlet/>;
}