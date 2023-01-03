import React, {useState, useEffect, useContext} from "react";
import EnrollCourseStyle from "./EnrollCourse.module.css";
import { Auth_Types } from "../../../../myTypes";
import { fetchAPI } from "../../../../Utils/fetchAPI";
import { AuthContext } from "../../../../Components/AuthProvider/AuthContext";
import { features } from "process";

export const EnrollCourse = function(){
	const style = EnrollCourseStyle;

	const authContext = useContext(AuthContext);

	if(!authContext?.credentials) throw new Error("no credentials");

	const [studentCourses, setStudentCourses] = useState<Auth_Types.ModifiedStudentCourseRecord[]>();
	const [professorCourses, setProfessorCourses] = useState<Auth_Types.ProfessorCourseRecord[]>();
	const [selectedProfessorCourse, setSelectedProfessorCourse] = useState<string>();

	useEffect(()=>{
		getProfessorCourses();
		getStudentCourses();

	},[]);


	const getStudentCourses = async () => {
		const data1:Auth_Types.StudentCourseRecord[] = await fetchAPI({path:"/studentCourses", query:{userId:authContext.credentials.userRecord.id,}, showAlert:false});
		console.log("🚀 ~ file: EnrollCourse.tsx:28 ~ getStudentCourses ~ data1", data1);
		const coursesStudentTaking = await Promise.all(data1.map(async(studentCourse):Promise<{studentCourseId:string,professorCourse:{professorCourseId:string,courseName:string,courseDescription:string,professorName:string}}>=>{
			let professorCourse:Auth_Types.ProfessorCourseRecord[] | Auth_Types.ProfessorCourseRecord = await fetchAPI({path:"/professorCourses", query:{id:studentCourse.professorCourse.professorCourseId}});
			if(Array.isArray(professorCourse)) professorCourse = professorCourse[0];
			console.log(studentCourse);
			console.log("🚀 ~ file: EnrollCourse.tsx:29 ~ coursesStudentTaking ~ professorCourse", professorCourse);
			return {studentCourseId:studentCourse.studentCourseId,professorCourse:{professorCourseId:professorCourse.id, courseName:professorCourse.course.name, courseDescription:professorCourse.course.description, professorName:professorCourse.user.name}};
		}));
		console.log("🚀 ~ file: EnrollCourse.tsx:32 ~ coursesStudentTaking ~ coursesStudentTaking", coursesStudentTaking);
		setStudentCourses(coursesStudentTaking);
	};
	const getProfessorCourses = () => {
		fetchAPI({path:"/professorCourses"})
			.then(data => {
				console.log("🚀 ~ file: EnrollCourse.tsx:44 ~ getProfessorCourses ~ data", data);
				setProfessorCourses(data);});
	};
    
	const assignStudentToCourse = () => {
		if(!selectedProfessorCourse) return alert("Error! Missing selection");

		fetchAPI({path:"/studentCourses",
			method:"POST",
			body:{userId: authContext.credentials.userRecord.id,professorCourseId: selectedProfessorCourse},
			showSuccess:true,
		})
			.then(()=>getStudentCourses());
	};

	const dropStudentFromCourse = (studentCourseId:string) => {
		fetchAPI({path:`/studentCourses/${studentCourseId}`,method:"DELETE", showSuccess:true})
			.then(()=>getStudentCourses());
	};


	return <div className={style["enroll-course-page"]}>
		<div className={[style["card"]].join(" ")}  >
			<p style={{backgroundColor: "hsl(44deg, 100%, 77%)"}}>Use the top left arrow to go back to the prev. page. </p>
			<p>Enroll in courses</p>
			<p className={style["warning-texts"]}>Courses that are not being taught by a professor will not show up.</p>
			<div>
				<div className={style["select"]}>
					<select className={style["style__select-element"]} onChange={e=>{console.log(e.target.value);setSelectedProfessorCourse((e.target.value));}}>
						<option key={"123123123"} value={""}>Select a course</option>

						{professorCourses?.map((course, index)=><option key={index} value={course.id}>
							Course:{course.course.name}   Professor:{course.user.name}
						</option>)}
					</select>
				</div>
			</div>
			<div>
				<button type="button" className={style["button"]} onClick={()=>assignStudentToCourse()}>Enroll in course</button>
			</div>
		</div>
		<div className={[style["table-container"], style["card"]].join(" ")}>
			<p className={style["table-name"]}>Courses currently enrolled</p>
			<table>
				<thead>
					<tr key={"randomKey123ABCxxx"}>
						<th></th>
						<th>Course ID</th>
						<th>Course Name</th>
						<th>Description</th>
						<th>Professor</th>
						<th>Drop Course</th>
					</tr>
				</thead>
				<tbody>
					{studentCourses?.length ? studentCourses?.map((record,index)=><tr key={index}>
						<td>{index+1}</td>
						<td>{record.professorCourse.professorCourseId}</td>
						<td>{record.professorCourse.courseName}</td>
						<td>{record.professorCourse.courseDescription}</td>
						<td>
							<p>{record.professorCourse.professorName}</p>
						</td>
						<td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>dropStudentFromCourse(record.studentCourseId)}>Drop</button></td>
					</tr>)
						:
						<p>No enrolled course</p>
					}
				</tbody>
			</table>
		</div>
	</div>;
};