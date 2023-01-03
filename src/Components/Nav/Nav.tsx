import React, {useState} from "react";
import {Link } from "react-router-dom";
import NavStyle from "./Nav.module.css";

export const Nav = function(){
	const [currentNav, setCurrentNav] = useState<string | null>(null);
	const style = NavStyle;

	return <nav>
		<ul>
			<li className={style.homeNav}><Link onClick={()=>setCurrentNav("home")} to={"/"}>University Center</Link></li>
			<li className={currentNav==="admin" ? style["highlightNav"] : null}><Link onClick={()=>setCurrentNav("admin")} to={"/public-admin"}>Administrators</Link></li>
			<li className={currentNav==="professor" ? style["highlightNav"] : null}><Link onClick={()=>setCurrentNav("professor")} to={"/public-professor"}>Professors</Link></li>
			<li className={currentNav==="student" ? style["highlightNav"] : null}><Link onClick={()=>setCurrentNav("student")} to={"/public-student"}>Students</Link></li>
		</ul>
	</nav>;
};