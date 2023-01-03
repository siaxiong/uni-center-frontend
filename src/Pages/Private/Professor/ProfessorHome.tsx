import React, {useState, useEffect, useContext} from "react";
import { Card } from "../../../Components/Card/Card";
import { AuthContext } from "../../../Components/AuthProvider/AuthContext";
import { Auth_Types } from "../../../myTypes";

export const ProfessorHome = () => {

	const authContext = useContext(AuthContext);
	if(!authContext) throw new Error("No credentials");

	const professorRecordsForThisUser = authContext.credentials.professorCourse;

	// type tempType = {name:string, pagePath:string}
	const list = professorRecordsForThisUser?.map(function(record):Auth_Types.CardItemType{
		const name = record.course.name;
		return {name, pagePath:name, id:record.professorCourseId};
	});


	return <div>
		<p>Professor Home Page</p>
		{list.length ? <Card list={list}/> : <p>You are not assigned to teach any course at the moment.</p>}
	</div>;
};