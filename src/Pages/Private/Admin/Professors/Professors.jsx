import React, { useEffect,useState} from "react";
import axios from "axios";
import ProfessorsStyle from "./ProfessorsStyle.module.css";

export const Professors = () => {
    const style = ProfessorsStyle;
    const [assignableCourses, setAssignableCourses] = useState([]);
    const [professors, setProfessors] = useState([]);

    const [assignedCourses, setAssignedCourses] = useState([])
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState("");
    
    useEffect(()=>{
        getAllProfessors()
        getAssignedCourses();
        getAllCourses();

    },[])


    //User with role of "Professor"
    const getAllProfessors = () => {
        axios({url: "/api/v1/users", params: {role: "PROFESSOR", aws_confirmed: true, enrolled: "ACCEPTED"}})
        .then(resp=>setProfessors(resp.data))
        .catch(e=>console.log(e))
    }

    const getAllCourses = () => {
        axios({url: "/api/v1/courses"})
        .then(resp=>setAssignableCourses(resp.data))
        .catch(e=>console.log(e))    }


    const getAssignedCourses = () => {
        axios({url:`/api/v1/professors`})
        .then(resp=>{
            console.log(resp.data);
            setAssignedCourses(resp.data)})
        .catch(e=>console.log(e))
    }
    

    const assignCourseToProfessor = () => {
        axios({method:"POST", url:`/api/v1/professors`, data: {userId: selectedProfessor, courseId: selectedCourse}})
        .then(resp=>{
            getAssignedCourses();
            // setSelectedCourse("");
            // setSelectedProfessor("")
        })
        .catch(e=>console.log(e))
    }

    const removeProfessorFromCourse = (professorId) => {
        axios({method:"DELETE",url:`/api/v1/professors/${professorId}`})
        .then(resp=>getAssignedCourses())
        .catch(e=>console.log(e))
    }


    return <div className={style["admin-professor-page"]}>
        <div className={[style["card"]].join(" ")}  >
            <p>Assign Courses To Professors</p>
            <p>Reminder that users with a role of "Professor" must have confirmed their account and been accepted before they can be assign to teach a course.</p>
            <div>
                <div className={style["select"]}>
                    <select className={style["style__select-element"]} onChange={e=>setSelectedProfessor(e.target.value)}>
                        <option>Select a professor</option>
                        {professors.map(professor=><option key={professor.id} value={professor.id}>{`Name: ${professor.name} , Email: ${professor.email}`}</option>)}
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
                    {assignedCourses.map((course,index)=><tr key={ course.professorId }>
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
    </div>
}