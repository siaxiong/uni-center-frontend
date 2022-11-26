import React, { useContext} from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import ProfileStyle from "./ProfileStyle.module.css";
import { Outlet, useNavigate } from "react-router-dom";


export const Profile = () => {
    const style = ProfileStyle;

    const {credentials, setCredentials}= useContext(AuthContext);
    const navigate = useNavigate();
    console.log(credentials);


    const logout = ()=>{
        sessionStorage.removeItem("/api/signin");
        setCredentials("");
        navigate("/");
    }

    return <div className={[style["Profile-Component"], style["card"],].join(" ")}>
        <header className={style["card-header"]}>
            <p className={style["card-header-title"]}>University of Javascript</p>
            <p>Role: {credentials?.user.role}</p>
            <p>Name: {credentials?.user.name}</p>
            <p>Email: {credentials?.user.email}</p>
            <p>Enrollment: {credentials?.user.enrolled}</p>
        </header>
        <footer className={style["card-footer"]}>
            <button className={[style["card-footer-item"], style["button"], style["is-info"]].join(" ")} onClick={()=>logout()}>Logout</button>
        </footer>
    </div>

}