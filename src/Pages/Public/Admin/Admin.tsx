import React from "react";
import AdminStyle from  "./AdminStyle.module.css";
import Admin_Home_IMG from "../../../images/Admin/Admin_Home.png";
import Admin_Accept_Users_IMG from "../../../images/Admin/Admin_Accept_Users.png";
import Admin_Create_Courses_IMG from "../../../images/Admin/Admin_Create_Courses.png";
import Admin_Assign_Courses_IMG from "../../../images/Admin/Admin_Assign_Courses.png";

export const PublicAdmin = function(){
	const style = AdminStyle;
	return <div className={style.PublicAdmin}>

		<div className={style["content-group"]}>
			<div className={style["content-item"]}>
				<div className={[style["content"], style["content-header"]].join(" ")}>
					<p>Outdated API documentations(images below are up to date)</p>
					<h5>The CRUD operations available for users with a administrator role.</h5>
					<a target="_blank" href="https://siaxiong.github.io/university-center-swagger/" rel="noreferrer">Interactive API Definitions</a>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>1. Admin Home Page</h5>
					<img src={Admin_Home_IMG} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>2. Admin Accept/Reject New Users Page</h5>
					<img src={Admin_Accept_Users_IMG} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>3. Admin Create/Delete Courses</h5>
					<img src={Admin_Create_Courses_IMG} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>4. Admin Assign/Unassign Courses (to users with role of Professor)</h5>
					<img src={Admin_Assign_Courses_IMG} alt="an image"/>
				</div>
			</div>
		</div>
	</div>;
};