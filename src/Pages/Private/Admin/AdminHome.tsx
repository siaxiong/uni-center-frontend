import React from "react";
import { Card } from "../../../Components/Card/Card";
import AdminHomeStyle from "./AdminHomeStyle.module.css";

export const AdminHome = () => {
	const style = AdminHomeStyle;

	const list = [
		{name:"Assign/Delete Professors To/From Courses", pagePath:"professors"},
		{name:"Create/Delete Courses", pagePath:"courses"},
		{name:"Accept/Delete Users", pagePath:"users"}
	];
	return <div className={style["Admin-Home-Page"]}>
		<Card list={list}/>
	</div>;
};