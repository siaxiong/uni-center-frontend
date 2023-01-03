import React, {useState} from "react";
import { AuthContext } from "./AuthContext";
import { Auth_Types } from "../../myTypes";
import {useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";

export const AuthProvider = ()=>{
	const navigate = useNavigate();

	const data = localStorage.getItem("university-center-user");
	if(!data) throw new Error("No credentials");
	const userData: Auth_Types.Credentials = JSON.parse(data);
	console.log("🚀 ~ file: AuthProvider.tsx:13 ~ AuthProvider ~ userData", userData);

	if(!userData?.tokens || !userData?.userRecord) throw new Error("no credentials");
	
	const [credentials, setCredentials] = useState<Auth_Types.Credentials>(userData);
	console.log("credentials: ", credentials);

	return <AuthContext.Provider value={{credentials, setCredentials}}>
		<Outlet/>
	</AuthContext.Provider>;
};



