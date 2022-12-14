import React from "react";
import AdminStyle from  "./AdminStyle.module.css";
import userUI from "../../../images/userUI.png";
import courseUI from "../../../images/courseUI.png";
import professorUI from "../../../images/professorUI.png";


export const PublicAdmin = function(){
	const style = AdminStyle;
	return <div className={style.PublicAdmin}>

		<div className={style["content-group"]}>
			<div className={style["content-item"]}>
				<div className={[style["content"], style["content-header"]].join(" ")}>
					<h5>The CRUD operations available for users with a administrator role.</h5>
					<a target="_blank" href="https://siaxiong.github.io/university-center-swagger/" rel="noreferrer">Interactive API Definitions</a>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>1. Accept/Reject New Users</h5>
					<div>                    
						<ul>
							<li>After a user signs up, a request for their desired role will be sent here.</li>
							<li>A user who is accepted will be able to perform the actions available for their role.</li>
							<li>A user with role Admin will have permission to perform everything on this current page.</li>
							<li>A user with role Professor will have permission to assign assignments and grade assignments.</li>
							<li>A user with role Student will have permission to pick courses to take and submit assignments.</li> 
						</ul>
					</div>
					<img src={userUI} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>2. Create/Delete Courses</h5>
					<div>
						<ul>
							<li>Each course name must be unique.</li>
							<li>Administrators are responsible for assigning courses for professors to teach.</li>
							<li>Students will enroll themselve in the courses they want to take.</li>
						</ul>
					</div> 
					<img src={courseUI} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>3. Assign/Unassign Professors To/From Courses</h5>
					<div>
						<ul>
							<li>Each course name must be unique.</li>
							<li>Administrators are responsible for assigning courses for professors to teach.</li>
							<li>Students will enroll themselve in the courses they want to take.</li>
						</ul>
					</div> 
					<img src={professorUI} alt="an image"/>
				</div>
			</div>
		</div>
	</div>;
};