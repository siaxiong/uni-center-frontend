import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../../Components/Nav/Nav";


export const PublicLayout = function(){
	return (<>
		<Nav/>
		<Outlet/>
	</>);
};