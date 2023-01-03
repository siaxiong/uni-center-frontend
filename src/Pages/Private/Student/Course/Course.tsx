import React, {useState, useEffect, useContext} from "react";
import StudentCourseStyle from "./Course.module.css";
import GlobalStyle from "../../../../Components/GlobalStyle/GlobalStyle.module.css";
import { AuthContext } from "../../../../Components/AuthProvider/AuthContext";
import { Auth_Types } from "../../../../myTypes";
import { fetchAPI } from "../../../../Utils/fetchAPI";
import { ENV_API } from "../../../../ENVIRONMNET_VAR";

export const Course = () => {
	const style = StudentCourseStyle;
	const [assignmentSubmissions, setAssignmentSubmissions] = useState<{assignment:Auth_Types.AssignmentRecord, assignmentSubmission:Auth_Types.AssignmentSubmission}[]>([]);
	const authContext = useContext(AuthContext);

	const studentCourseId = (new URLSearchParams(window.location.search)).get("id");
	const courseName = (window.location.pathname).slice((window.location.pathname.lastIndexOf("/") + 1));	

	useEffect(()=>{
		if(!authContext) throw new Error("no credentials");
		getAssignmentSubmissions();

	},[]);

	const getAssignmentSubmissions = ()=>{
		fetchAPI({path:`/studentCourses/${studentCourseId}/assignmentSubmissions`})
			.then(data=>{
				console.log(data);
				setAssignmentSubmissions(data);});
	};


	const replacePdfInAssignment =  (studentCourseId:string, assignmentSubmissionId:string,e:React.ChangeEvent<HTMLInputElement>) => {
		if(!e?.target?.files) return alert("Error! Missing pdf file");

		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("pdfFile", file);
		fetchAPI({path:`/studentCourses/${studentCourseId}/assignmentSubmissions/${assignmentSubmissionId}`,
			method:"PUT",
			body:formData,
		
			showSuccess: true,
		})
			.then(()=>getAssignmentSubmissions());
	};


	return <div className={style["assignmentSubmissions-Page"]}>
		<div className={[style["table-container"], style["card"]].join(" ")}>
			<p style={{backgroundColor: "hsl(44deg, 100%, 77%)"}}>Use the top left arrow to go back to the prev. page. </p>
			<p className={style["table-title"]}><b>Course Name:</b> {courseName}</p>
			<p className={style["table-title"]}>Current assignments. Every assignment is a PDF.</p>
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Details</th>
							<th>Download Assignment/Submission</th>
							<th>Submit Assignment/Replace Assignment Submission</th>
						</tr>
					</thead>
					<tbody>
						{assignmentSubmissions.length ?
							assignmentSubmissions.map((record,index)=><tr key={record.assignment.pdfId}>
								<td>
									<p>{index+1}</p>
								</td>
								<td>
									<p>{record.assignment.name}</p>
								</td>
								<td className={style["td-description"]}>
									<div>
										<p><b>Description:</b></p>
										<p>{record.assignment.description}</p>
									</div>
									<div>
										<p><b>Assigned:</b></p>
										<p>{record.assignment.assigned_date}</p>
									</div>
									<div>
										<p><b>Due:</b></p>
										<p>{record.assignment.due_date}</p>
									</div>
								</td>
								<td>
									<div>
										<a target={"_blank"} rel="noreferrer" href={`${ENV_API.resourceServer}/professorCourses/${record.assignment.professorCourseId}/assignments/${record.assignment.id}/pdf?authorization=${authContext?.credentials.tokens.accessToken}`} download className={[style["button"], style["is-warning"]].join(" ")}>Assignment</a>
									</div>
									<div>
										<a target={"_blank"} rel="noreferrer" href={`${ENV_API.resourceServer}/studentCourses/${record.assignmentSubmission.studentCourseId}/assignmentSubmissions/${record.assignmentSubmission.id}/pdf?authorization=${authContext?.credentials.tokens.accessToken}`} download className={[style["button"], style["is-warning"]].join(" ")}>Submission</a>
									</div>
								</td>
								<td>
									<div>
										<input id="upload" onChange={e=>replacePdfInAssignment(record.assignmentSubmission.studentCourseId,record.assignmentSubmission.id,e)} type="file" name="pdfFile" accept=".pdf"/>
									</div>
								</td>
							</tr>)
							: <p>No assignments</p>}
					</tbody>
				</table>
			</div>
		</div>
	</div>;

};