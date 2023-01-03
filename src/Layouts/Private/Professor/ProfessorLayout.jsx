import React from "react";
import { Outlet } from "react-router-dom";
import { Profile } from "../../../Components/Profile/Profile";

export const ProfessorLayout = () => {
	return <div>
		<Profile/>
		<Outlet />
	</div>;
};