import React, { useEffect,useState } from "react";
import ProfessorsStyle from "./ProfessorsStyle.module.css";
import { fetchAPI } from "../../../../Utils/fetchAPI";
import { Auth_Types } from "../../../../myTypes";

export const Professors = () => {
	const style = ProfessorsStyle;
	const [courses, setCourses] = useState<Auth_Types.CourseRecord[]>();
	const [usersWithProfessorRole, setUsersWithProfessorRole] = useState<Auth_Types.UserRecord[]>();

	const [professorRecords, setProfessorsRecords] = useState<Auth_Types.ProfessorCourseRecord[]>();
	const [selectedCourse, setSelectedCourse] = useState<string>();
	const [selectedUser, setSelectedUser] = useState<string>();

	useEffect(()=>{
		getUsersWithProfessorRole();
		getProfessorCourseRecords();
		getCourses();

	},[]);

	//User with role of "Professor"
	const getUsersWithProfessorRole = () => {
		fetchAPI({path:"/users", query:{role:"Professor", enrollmentStatus: "Accepted"}})
			.then(data=>setUsersWithProfessorRole(data));
	};	

	const getCourses = () => {
		fetchAPI({path:"/courses"})
			.then(data=>setCourses(data));
	};

	const getProfessorCourseRecords = () => {
		fetchAPI({path:"/professorCourses"})
			.then(data=>{console.log(data);setProfessorsRecords(data);});
	};
    
	const assignCourseToUser = () => {
		if(selectedUser&&selectedCourse)
			fetchAPI({path:"/professorCourses", method:"POST", body:{userId: selectedUser, courseId: selectedCourse}, showSuccess:true})
				.then(()=>getProfessorCourseRecords());
	};

	const removeProfessorFromCourse = (professorCourseId:string) => {
		fetchAPI({path:`/professorCourses/${professorCourseId}`,method:"DELETE", showSuccess:true})
			.then(()=>getProfessorCourseRecords());
	};


	return <div className={style["admin-professor-page"]}>
		<div className={[style["card"]].join(" ")}  >
			<p style={{backgroundColor: "hsl(44deg, 100%, 77%)"}}>Use the top left arrow to go back to the prev. page. </p>
			<p>Assign Courses To usersWithProfessorRole</p>
			<p className={style["warning-texts"]}>Reminder that users with a role of Professor must have their enrollment accepted before they can be assign to teach a course.</p>
			<div>
				<div className={style["select"]}>
					<select className={style["style__select-element"]} onChange={e=>setSelectedUser(e.target.value)}>
						<option>Select a professor</option>
						{usersWithProfessorRole?.map(professor=><option key={professor.id} value={professor.id}>{`Name: ${professor.name} , Email: ${professor.email}`}</option>)}
					</select>
				</div>
			</div>
			<div>
				<div className={style["select"]}>
					<select className={style["style__select-element"]} onChange={e=>console.log(setSelectedCourse((e.target.value)))}>
						<option key={"123123123"} value={"null"}>Select a course</option>
						{courses?.map(course=><option key={course.id} value={course.id}>
							{course.name}
						</option>)}
					</select>
				</div>
			</div>
			<div>
				<button type="button" className={style["button"]} onClick={()=>assignCourseToUser()}> Assign Course</button>
			</div>
		</div>
		<div className={[style["table-container"], style["card"]].join(" ")}>
			<p className={style["table-name"]}>All Courses That Were Assigned To usersWithProfessorRole</p>
			<table>
				<thead>
					<tr key={"randomKey123ABCxxx"}>
						<th></th>
						<th>ID</th>
						<th>Course Name</th>
						<th>Description</th>
						<th>Professor</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{ professorRecords?.length ? professorRecords?.map((professorRecord,index)=><tr key={ professorRecord.id}>
						<td>{index+1}</td>
						<td>{professorRecord.id}</td>
						<td>{professorRecord.course.name}</td>
						<td>{professorRecord.course.description}</td>
						<td>
							<p>{professorRecord.user.name}</p>
							<p>{professorRecord.user.email}</p>
							{/* <p>{course.userId}</p> */}
						</td>
						<td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>removeProfessorFromCourse(professorRecord.id)}>Remove Professor From Course</button></td>
					</tr>): <td>No course assigned to a user with a role of Professor</td>}
				</tbody>
			</table>
		</div>
	</div>;
};