import React from "react";
import ProfessorStyle from  "./ProfessorStyle.module.css";
import Professor_Home_IMG from "../../../images/Professor/Professor_Home.png";
import Professor_Create_Assignments_IMG from "../../../images/Professor/Professor_Create_Assignments.png";

export const PublicProfessor = function(){
	const style = ProfessorStyle;
	return <div className={style.PublicAdmin}>

		<div className={style["content-group"]}>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>1. Professor Home Page</h5>
					<img src={Professor_Home_IMG} alt="an image"/>
				</div>
			</div>
			<div className={style["content-item"]}>
				<div className={style.content}>
					<h5>2. Professor Create/Delete Assignments Page</h5>
					<img src={Professor_Create_Assignments_IMG} alt="an image"/>
				</div>
			</div>
		</div>
	</div>;
};