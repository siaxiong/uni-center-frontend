import React, {useContext} from "react";
import { AuthContext } from "./AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { Auth_Types } from "../../myTypes";
// import { AuthProvider } from "./AuthProvider";

export const ProtectedRoutes = () => {
	// const navigate = useNavigate();
	// const data = localStorage.getItem("university-center-user");
	// if(!data) throw new Error("No credentials");
	// const userData: Auth_Types.Credentials = JSON.parse(data);

	// if(!userData?.tokens || !userData?.userRecord) throw new Error("no credentials");

	// navigate(`/${userCredentialContext.credentials.userRecord.role.toLocaleLowerCase()}`);
	
	// if(!credentials || !credentials.tokens || !credentials.userRecord) {
	// 	throw new Error("No credentials! Please login again.");
	// 	<Navigate to="/" replace/>;
	// }
	return (<>
		{/* <AuthProvider> */}
		<Outlet/>
		{/* </AuthProvider> */}
	</>);
};