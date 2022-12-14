import React, { useContext} from "react";
import { AuthContext } from "../AuthProvider/AuthContext";
import ProfileStyle from "./ProfileStyle.module.css";
import {useNavigate } from "react-router-dom";


export const Profile = () => {
	const style = ProfileStyle;

	const userCredentialContext = useContext(AuthContext);
	const navigate = useNavigate();

	if(!userCredentialContext?.credentials || !userCredentialContext?.setCredentials) throw new Error("no credentials");

	const userRecord = userCredentialContext.credentials.userRecord;
	

	const logout = async ()=>{
		localStorage.removeItem("university-center-user");
		navigate("/");
	};

	return <div className={[style["Profile-Component"], style["card"],].join(" ")}>
		<header className={style["card-header"]}>
			<p className={style["card-header-title"]}>University of Javascript</p>
			<p>Role: {userRecord.role}</p>
			<p>Name: {userRecord.name}</p>
			<p>Email: {userRecord.email}</p>
			<p>Enrollment: {userRecord.enrollmentStatus}</p>
		</header>
		<footer className={style["card-footer"]}>
			<button className={[style["card-footer-item"], style["button"], style["is-info"]].join(" ")} onClick={()=>logout()}>Logout</button>
		</footer>
	</div>;

};