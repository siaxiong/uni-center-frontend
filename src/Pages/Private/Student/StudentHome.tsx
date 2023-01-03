import React, {useState, useEffect, useContext} from "react";
import { Card } from "../../../Components/Card/Card";
import { fetchAPI } from "../../../Utils/fetchAPI";
import { Auth_Types } from "../../../myTypes";
import { AuthContext } from "../../../Components/AuthProvider/AuthContext";

export const StudentHome = () => {
	const [list, setList] = useState<Auth_Types.CardItemType[]>([{name:"Add/Drop Course", pagePath:"add-drop-course"}]);
	const authContext = useContext(AuthContext);

	if(!authContext) throw new Error("no credentials");


	useEffect(()=>{
		fetchAPI({path:"/studentCourses", query:{userId:authContext.credentials.userRecord.id}})
			.then((data:Auth_Types.ModifiedStudentCourseRecord[]) => {
				console.log("🚀 ~ file: StudentHome.tsx:20 ~ useEffect ~ data", data);
				const arr = data.map(record=>{
					return {name:record.professorCourse.courseName, pagePath:record.professorCourse.courseName,id:record.studentCourseId};
				});
				console.log("🚀 ~ file: StudentHome.tsx:21 ~ arr ~ arr", arr);
				setList([...list,...arr]);
			});
	},[]);


	return (<>
		<div>
			<p>Student Home Page</p>
			<Card list={list}/>
		</div>
	</>);
};