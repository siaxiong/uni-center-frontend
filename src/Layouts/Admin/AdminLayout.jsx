import React, {useContext} from "react";
import AdminLayoutCSS from "./AdminLayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider/AuthContext";


export const AdminLayout = ({children}) => {
    
    const {credentials, setCredentials}= useContext(AuthContext);
    const navigate = useNavigate();

    const logout = ()=>{
        sessionStorage.removeItem("/api/signin");
        
        setCredentials("");

        navigate("/");
    }

    console.log(credentials.email)
    return <div className={AdminLayout["AdminLayout"]}>
        <p>Admin Layout</p>
        <button onClick={()=>logout()}>Logout</button>
        <p>{`EMAIL: ${credentials.email}`}</p>
        <p>{`EMAIL: ${credentials.role}`}</p>
        <Outlet/>
    </div>
}