import React, { useEffect,useState} from "react";
import ProfessorsStyle from "./ProfessorsStyle.module.css";
import { fetchAPI } from "../../../../Utils/fetchAPI";

export const Professors = () => {
	const style = ProfessorsStyle;
	const [assignableCourses, setAssignableCourses] = useState([]);
	const [professors, setProfessors] = useState([]);

	const [assignedCourses, setAssignedCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState([]);
	const [selectedProfessor, setSelectedProfessor] = useState([]);
    
	useEffect(()=>{
		getAllProfessors();
		getAssignedCourses();
		getAllCourses();

	},[]);


	//User with role of "Professor"
	const getAllProfessors = () => {
		fetchAPI({path:"/users", query:{role:"Professor", enrollmentStatus: "Accepted"}})
			.then(data=>setProfessors(data))
			.catch(e=>console.log(e));
	};	

	const getAllCourses = () => {
		fetchAPI({path:"/courses"})
			.then(data=>setAssignableCourses(data))
			.catch(e=>console.log(e));
	};


	const getAssignedCourses = () => {
		fetchAPI({path:"/professors"})
			.then(data=>setAssignedCourses(data))
			.catch(e=>console.log(e));
	};
    

	const assignCourseToProfessor = () => {
		fetchAPI({path:"/professors", method:"POST", body:{userId: selectedProfessor, courseId: selectedCourse}})
			.then(()=>getAssignedCourses())
			.catch(e=>console.log(e));
	};

	const removeProfessorFromCourse = (professorId) => {
		fetchAPI({path:`/professors/${professorId}`,method:"DELETE"})
			.then(()=>getAssignedCourses())
			.catch(e=>console.log(e));
	};


	return <div className={style["admin-professor-page"]}>
		<div className={[style["card"]].join(" ")}  >
			<p>Assign Courses To Professors</p>
			<p className={style["warning-texts"]}>Reminder that users with a role of Professor must have confirmed their account and been accepted before they can be assign to teach a course.</p>
			<div>
				<div className={style["select"]}>
					<select className={style["style__select-element"]} onChange={e=>setSelectedProfessor(e.target.value)}>
						<option>Select a professor</option>
						{professors?.map(professor=><option key={professor.id} value={professor.id}>{`Name: ${professor.name} , Email: ${professor.email}`}</option>)}
					</select>
				</div>
			</div>
			<div>
				<div className={style["select"]}>
					<select className={style["style__select-element"]} onChange={e=>console.log(setSelectedCourse((e.target.value)))}>
						<option key={"123123123"} value={"null"}>Select a course</option>
						{assignableCourses.map(course=><option key={course.id} value={course.id}>
							{course.name}
						</option>)}
					</select>
				</div>
			</div>
			<div>
				<button type="click" className={style["button"]} onClick={()=>assignCourseToProfessor()}> Assign Course</button>
			</div>
		</div>

		<div className={[style["table-container"], style["card"]].join(" ")}>
			<p className={style["table-name"]}>All Courses That Were Assigned To Professors</p>
			<table>
				<thead>
					<tr key={"randomKey123ABC"}>
						<th></th>
						<th>ID</th>
						<th>Course Name</th>
						<th>Description</th>
						<th>Professor</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{assignedCourses?.map((course,index)=><tr key={ course.professorId }>
						<td>{index+1}</td>
						<td>{course.courseId}</td>
						<td>{course.courseName}</td>
						<td>{course.description}</td>
						<td>
							<p>{course.userName}</p>
							<p>{course.userEmail}</p>
							{/* <p>{course.userId}</p> */}

						</td>
						<td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>removeProfessorFromCourse(course.professorId)}>Remove Professor From Course</button></td>
					</tr>)}
				</tbody>
			</table>
		</div>
	</div>;
};