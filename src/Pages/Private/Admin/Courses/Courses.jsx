import React, { useState, useEffect } from "react";
import CoursesStyle from "./CoursesStyle.module.css";
import GlobalStyle from "../../../../Components/GlobalStyle/GlobalStyle.module.css";
//NEED FIXES
/** 
 * 
 *1. After deleting a course, the immediate next api call to retrieve courses returns the same 
 data. Not sure why. Need to refresh the page to get the updated data from database. 
 */
import { fetchAPI } from "../../../../Utils/fetchAPI";

export const Courses = () => {
	const style = CoursesStyle;

	const [courses, setCourses] = useState([]);
	const [newCourseName, setNewCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [missingField, setMissingField] = useState(false);

	const getCourses = ()=>{
		fetchAPI({path:"/courses"})
			.then(data=>setCourses(data));
	};
    
	useEffect(()=>{
		getCourses();
	},[]);


	const createCourse = async (e)=>{
		e.preventDefault();
		try {
			if(newCourseName&&courseDescription){
				await fetchAPI({path:"/courses", method: "POST", body:{name: newCourseName, description: courseDescription}});
				getCourses();
				setNewCourseName("");
				setCourseDescription("");
				setMissingField(false);
			}else{
				setMissingField(true);
			}
		} catch (error) {
			console.log(error);
		}
	};


	const deleteCourse =  (id) => {
		fetchAPI({path:`/courses/${id}`, method:"DELETE"})
			.then(()=>getCourses());
	};


	return <div className={style["Courses-Page"]}>
		<form className={[style["create-course-form"], style["card"]].join(" ")}>
			<p>Create a new course</p>
			<input type="text" className={[style["input"],missingField&&!newCourseName ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={(e)=>setNewCourseName(e.target.value)} value={newCourseName} placeholder="Enter Course Name" />
			{missingField&&!newCourseName ? <p className={GlobalStyle["input-field__required-msg"]}>Course name required !</p> : null}
			<textarea className={[style["textarea"],(missingField&&!newCourseName) ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={e=>setCourseDescription(e.target.value)} value={courseDescription} placeholder={"Enter Course Description"} rows={5} cols={5}/>
			{missingField&&!courseDescription ? <p className={GlobalStyle["input-field__required-msg"]}>Course Description required!</p> : null}
			<button type="click" className={style["button"]} onClick={e=>createCourse(e)}> Create Course</button>
		</form>
		<div className={[style["table-container"], style["card"]].join(" ")}>
			<p className={style["table-title"]}>Current Courses</p>
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>ID</th>
							<th>Course</th>
							<th>Description</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{courses.map((course,index)=><tr key={course.id}>
							<td>{`${index+1}`}</td>
							<td>{`${course.id}`}</td>
							<td>{`${course.name}`}</td>
							<td>{`${course.description}`}</td>
							<td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>deleteCourse(course.id)}>Permanently Delete</button></td>
						</tr>)}
					</tbody>
				</table>
			</div>
		</div>
	</div>;


};

