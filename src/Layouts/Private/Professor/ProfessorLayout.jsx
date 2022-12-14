import React from "react";
import { Outlet } from "react-router-dom";

export const ProfessorLayout = () => {
	return <div>
		<p>Professor Layout</p>
		<Outlet />
	</div>;
};