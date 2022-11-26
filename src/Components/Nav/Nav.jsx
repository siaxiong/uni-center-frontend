import userEvent from "@testing-library/user-event";
import React, {useState, useEffect} from "react";
import { Navigate, Link } from "react-router-dom";
import NavStyle from "./Nav.module.css";

export const Nav = function(){
    const [currentNav, setCurrentNav] = useState(null);
    const style = NavStyle;




    return <nav>
        <ul>
            <li className={style.homeNav}><Link onClick={()=>setCurrentNav("home")} to={"/"}>University Center</Link></li>
            <li className={currentNav==="admin" ? style["highlightNav"] : null}><Link onClick={()=>setCurrentNav("admin")} to={"/public-admin"}>For Administrators</Link></li>
            <li className={currentNav==="professor" ? style["highlightNav"] : null}><Link onClick={()=>setCurrentNav("professor")} to={"/public-professor"}>For Professors</Link></li>
            <li className={currentNav==="student" ? style["highlightNav"] : null}><Link onClick={()=>setCurrentNav("student")} to={"/public-student"}>For Students</Link></li>
        </ul>
    </nav>
}