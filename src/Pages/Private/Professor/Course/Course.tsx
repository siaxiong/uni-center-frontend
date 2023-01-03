import React, {useState, useEffect, useContext} from "react";
import ProfessorCourseStyle from "./Course.module.css";
import GlobalStyle from "../../../../Components/GlobalStyle/GlobalStyle.module.css";
import { fetchAPI } from "../../../../Utils/fetchAPI";
import { AuthContext } from "../../../../Components/AuthProvider/AuthContext";
import { Auth_Types } from "../../../../myTypes";
import { ENV_API } from "../../../../ENVIRONMNET_VAR";

export const Course = () => {
	const style = ProfessorCourseStyle;

	const [assignmentRecords, setAssignmentRecords] = useState<Auth_Types.AssignmentRecord[]>([]);
	const [newAssignmentName, setNewAssignmentName] = useState("");
	const [assignmentDescription, setAssignmentDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [points, setPoints] = useState(0);
	const [missingField, setMissingField] = useState(false);
	const [formData, setFormData] = useState<FormData>();

	const authContext = useContext(AuthContext);
	const professorRecordId = (new URLSearchParams(window.location.search)).get("id") as string;

	useEffect(()=>{
		if(!authContext) throw new Error("no credentials");
	},[]);


	const getCourses = ()=>{
		fetchAPI({path:`/professorCourses/${professorRecordId}/assignments`})
			.then(data=>{
				setAssignmentRecords(data);});
	};
    
	useEffect(()=>{
		getCourses();
	},[]);

	const clearStates = ()=>{
		setNewAssignmentName("");
		setAssignmentDescription("");
		setDueDate("");
		setFormData(new FormData);
		setPoints(0);
		setMissingField(false);

	};


	const createAssignment = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
		e.preventDefault();
		if(!(newAssignmentName&&assignmentDescription&&dueDate&&points&&(formData?.get("pdfFile")))) return alert("Error! Missing field(s)");

		const assigned_date = new Date().toLocaleString("en-US",{timeZone: "PST"});
		const params = new URLSearchParams({name:newAssignmentName,description: assignmentDescription,pointsWorth:points.toString(),due_date:dueDate,assigned_date});				
		fetchAPI({path:`/professorCourses/${professorRecordId}/assignments?${params}`,method:"POST", body:formData})
			.then(()=>{
				getCourses();
				clearStates();
			});
	};

	const replacePdfInAssignment =  (professorId:string, fileId:string,id:string,e:React.ChangeEvent<HTMLInputElement>) => {

		if(!e.target.files) return alert("Error! Missing pdf file");

		const file = e.target.files[0];
		const tempFormData = new FormData();
		tempFormData.append("pdfFile", file);

		fetchAPI({path:`/professorCourses/${professorId}/assignments/${id}`,
			method: "PUT",
			body: tempFormData,
			showSuccess: true,
		})
			.then(()=>getCourses());
	};

	const processFileUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
		if(!e.target.files) return alert("Error! Missing pdf file");

		const tempFormData = new FormData();
		tempFormData.append("pdfFile", e.target.files[0]);
		console.log(tempFormData.values());
		setFormData(tempFormData);
	};

	const deleteAssignment = async  function({professorId, id}:{professorId:string, id:string}){
		fetchAPI({path:`/professorCourses/${professorId}/assignments/${id}`, method:"DELETE", showSuccess: true})
			.then(()=>getCourses());
	};


	const pathCourseNameIndex = (window.location.pathname).lastIndexOf("/");
	const courseName = (window.location.pathname).slice(pathCourseNameIndex+1);

	return <div className={style["professor-course-page"]}>
		<form className={[style["create-assignment-form"], style["card"]].join(" ")}>
			<p style={{backgroundColor: "hsl(44deg, 100%, 77%)"}}>Use the top left arrow to go back to the prev. page. </p>
			<p><b>Course Name:</b> {courseName}</p>
			<p>Create a new assignment</p>
			<div>
				<input type="text" className={[style["input"],missingField&&!newAssignmentName ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={(e)=>setNewAssignmentName(e.target.value)} value={newAssignmentName} placeholder="Enter Assignment Name" />
				{missingField&&!newAssignmentName ? <p className={GlobalStyle["input-field__required-msg"]}>Assignment name required !</p> : null}
			</div>
			<div>
				<label htmlFor="pdfFile">
					Upload PDF file
					<input onChange={e=>processFileUpload(e)} type="file" id="pdfFile" name="pdfFile" accept=".pdf" /></label>
			</div>
			<div>
				<label htmlFor="pointsWorth">
					Assignment Points Worth
					<input onChange={e=>setPoints(parseInt(e.target.value))} value={points} type="number" id="pointsWorth"/></label>
			</div>
			<div>
				<label htmlFor="dueDateTime">
					Due Date
					<input onChange={e=>setDueDate(e.target.value)} value={dueDate} id="dueDateTime" type="datetime-local"/>
				</label>
			</div>
			<textarea className={[style["textarea"],(missingField&&!newAssignmentName) ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={e=>setAssignmentDescription(e.target.value)} value={assignmentDescription} placeholder={"Enter Assignment Description"} rows={5} cols={5}/>
			{missingField&&!assignmentDescription ? <p className={GlobalStyle["input-field__required-msg"]}>Assignment Description required!</p> : null}
			<button type="button" className={style["button"]} onClick={e=>createAssignment(e)}> Create Assignment</button>
		</form>
		<div className={[style["table-container"], style["card"]].join(" ")}>
			<p className={style["table-title"]}>Current assignments. Every assignment is a PDF.</p>
			<div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Details</th>
							<th>Points Worth</th>
							<th>Grade Assignment</th>
							<th>Download PDF</th>
							<th>Replace PDF</th>
							<th>Delete Assignment</th>
						</tr>
					</thead>
					<tbody>
						{assignmentRecords.map((assignment,index)=><tr key={assignment.pdfId}>
							<td>
								<p>{index+1}</p>
							</td>
							<td>
								<p>{assignment.name}</p>
							</td>
							<td className={ style["td-details"]}>
								<div>
									<p><b>Description:</b></p>
									<p>{assignment.description}</p>
								</div>
								<div>
									<p><b>Assigned:</b></p>
									<p>{assignment.assigned_date}</p>
								</div>
								<div>
									<p><b>Due:</b></p>
									<p>{assignment.due_date}</p>
								</div>
							</td>
							<td>
								<p>
									{assignment.pointsWorth}
								</p>
							</td>
							<td>
								<div>
									<button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>alert("This feature is not implemented yet.")}>Grade</button>
								</div>
							</td>
							<td>
								<div>
									<a target={"_blank"} rel="noreferrer" href={`${ENV_API.resourceServer}/professorCourses/${assignment.professorCourseId}/assignments/${assignment.id}/pdf?authorization=${authContext?.credentials.tokens.accessToken}`} download className={[style["button"], style["is-warning"]].join(" ")}>Download</a>
								</div>
							</td>
							<td>
								<div>
									<input id="replacePDF" onChange={e=>replacePdfInAssignment(assignment.professorCourseId, assignment.pdfId, assignment.id,e)} type="file" name="pdfFile" accept=".pdf"/>
								</div>
							</td>
							<td>
								<div>
									<button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>deleteAssignment({professorId:assignment.professorCourseId, id:assignment.id})}>Delete</button>
								</div>
							</td>
						</tr>)}
					</tbody>
				</table>
			</div>
		</div>
	</div>;
};