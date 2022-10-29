import React, { useContext} from "react";
import { AuthContext } from "../../Components/AuthProvider/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav } from "../../Components/Nav/Nav";
import { Form } from "../../Components/Form/Form";
import Home_Style from "./Public_Home.module.css";



export const PublicHome = function(){
    
    return <div className={Home_Style.PublicHomePage}>
        <Nav/>
        <p>Public Home Page</p>
        <Form/>
    </div>

}
