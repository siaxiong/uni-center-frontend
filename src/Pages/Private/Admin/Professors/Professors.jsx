import React, { useEffect,useState} from "react";
import axios from "axios";
import ProfessorsStyle from "./ProfessorsStyle.module.css";

export const Professors = () => {
    const style = ProfessorsStyle;
    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);

    const [assignedCourses, setAssignedCourses] = useState([])
    const [submitSuccess, setSubmitSuccess] = useState(false);


    const [actionType, setActionType] = useState("");

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedProfessor, setSelectedProfessor] = useState("");
    
    useEffect(()=>{
        axios({url:"/api/admin/professors"})
        .then(resp=>{
            console.log(resp);
            setProfessors(resp.data);
        })
        .catch(e=>console.log(e))
        setSelectedProfessor("")
        setSelectedCourse("")

    },[actionType])

    useEffect(()=>{

        if(actionType==="ASSIGN"){
            getUnassignedCourses();
        }

        if(actionType==="UNASSIGN"){
            console.log(actionType)
            getAssignedCourses(selectedProfessor)
        }

    },[selectedProfessor])

    const getUnassignedCourses = () => {
        axios({url:"/api/admin/course", params:{id:selectedProfessor}})
        .then(resp=>{
            console.log(resp.data);
            setCourses(resp.data);
        })
        .catch(e=>console.log(e))
    }
    const getAssignedCourses = (professorId) => {
        axios({url:"/api/admin/assigned-courses", params: {id:professorId}})
        .then(resp=>setAssignedCourses(resp.data))
        .catch(e=>console.log(e))
    }
    
    useEffect(()=>{
        console.log("setSelected ran")
    }, [selectedCourse])

    const assignCourseToProfessor = () => {
        axios({method:"POST", url:"/api/admin/professor", data:{professorId:selectedProfessor, courseId:selectedCourse}})
        .then(resp=>{
            setSelectedCourse("");
            getUnassignedCourses();
        })
        .catch(e=>console.log(e))
    }

    const removeProfessorFromCourse = () => {
        axios({method:"DELETE",url:"/api/admin/professor",data:{id:selectedProfessor,courseId:selectedCourse}})
        .then(resp=>getAssignedCourses(selectedProfessor))
        .catch(e=>console.log(e))
    }


    return <div className={style["style"]}>
        <p>Select Action</p>
        <div className={style["select"]}>
            <select className={style["style__select-element"]} onChange={e=>setActionType(e.target.value)}>
                <option value={"null"}>Select action</option>
                <option value={"ASSIGN"}>Assign Professor To Course</option>
                <option value={"UNASSIGN"}>Remove Professor From Course</option>
            </select>
        </div>
        {
            actionType&&(actionType === "ASSIGN") ?  
            <div>
                <div className={style["select"]}>
                    <select className={style["style__select-element"]} onChange={e=>setSelectedProfessor(e.target.value)}>
                        <option>Select a professor</option>
                        {professors.map(professor=><option key={professor.id} value={professor.id}>{professor.name}</option>)}
                    </select>
                </div>
                <div className={style["select"]}>
                    <select className={style["style__select-element"]} onChange={e=>console.log(setSelectedCourse((e.target.value)))}>
                        <option key={"123123123"} value={"null"}>Select a course</option>
                        {courses.map(course=><option key={course.id} value={course.id}>
                            {course.name}
                        </option>)}
                    </select>
                </div>
            <div>
        </div>
        <div>
            {selectedCourse ? <p>Description: {courses.find(course=>course.id===selectedCourse)?.description}</p> : null}
            {selectedCourse&&selectedProfessor ?  <p>Assign ***{(courses.find(course=>course.id===selectedCourse))?.name}*** to ***{selectedProfessor}***</p> : null}
            <button className={style["button"]} onClick={()=>assignCourseToProfessor()}>Assign</button>
        </div>
        </div>
        : null
        }

        {
            actionType&&(actionType==="UNASSIGN") ? 
            <div>
                <div className={style["select"]}>
                    <select className={style["style__select-element"]} onChange={e=>setSelectedProfessor(e.target.value)}>
                        <option>Select a professor</option>
                        {professors.map(professor=><option key={professor.id} value={professor.id}>{professor.name}</option>)}
                    </select>
                </div>
                <div className={style["select"]}>
                    <select className={style["style__select-element"]} onChange={e=>console.log(setSelectedCourse((e.target.value)))}>
                        <option key={"123123123"} value={"null"}>Select a course</option>
                        {assignedCourses.map(course=><option key={course.id} value={course.id}>
                            {course.name}
                        </option>)}
                    </select>
                </div>
                <div>
                    {selectedCourse ? <p>{assignedCourses.find(course=>course.id===selectedCourse)?.description}</p> : null}
                    {selectedCourse&&selectedProfessor ?  <p>Remove ***{(professors.find(professor=>professor.id===selectedProfessor))?.name}*** from ***{(assignedCourses.find(course=>course.id===selectedCourse))?.name}***</p> : null}
                    <button className={style["button"]} onClick={()=>removeProfessorFromCourse()}>Remove</button>
                </div>
            </div>
            
             : null
        }

    </div>
}