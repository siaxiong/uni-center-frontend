import React from "react";
import StudentStyle from  "./StudentStyle.module.css";
import Student_Home_IMG from "../../../images/Student/Student_Home.png";
import Student_Add_Courses_IMG from "../../../images/Student/Student_Add_Courses.png";
import Student_Courses_IMG from "../../../images/Student/Student_Courses.png";

export const PublicStudent = function(){
	const style = StudentStyle;
	return <div className={style.PublicAdmin}>

		<div className={style["content-group"]}>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>1. Student Home Page</h5>
					<img src={Student_Home_IMG} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>2. Student Add/Drop Course Page</h5>
					<img src={Student_Add_Courses_IMG} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>2. Student Course Assignment Page</h5>
					<img src={Student_Courses_IMG} alt="an image"/>
				</div>
			</div>
		</div>
	</div>;
};