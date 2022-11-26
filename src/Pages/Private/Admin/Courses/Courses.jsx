import React, { useState, useEffect } from "react";
import axios from "axios";
import CoursesStyle from "./CoursesStyle.module.css";
import GlobalStyle from "../../../../Components/GlobalStyle/GlobalStyle.module.css";
import { useNavigate } from "react-router-dom";
//NEED FIXES
/** 
 * 
 *1. After deleting a course, the immediate next api call to retrieve courses returns the same 
 data. Not sure why. Need to refresh the page to get the updated data from database. 
 */

export const Courses = ({action}) => {
    // console.log(Bulma);

    const apiPath = {
        courses: "/api/v1/courses"
    }

    const style = CoursesStyle;

    const [courses, setCourses] = useState([]);
    const [createNewCourse, setCreateNewCourse] = useState(true);
    const [newCourseName, setNewCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("")
    const [editLists, setEditLists] = useState(false);
    const [missingField, setMissingField] = useState(false);
    const [acitonType, setActionType] = useState(action ? action : "CREATE");
    const [existingCourses, setExistingCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");



    const getCourses = ()=>{
        axios({url: apiPath.courses})
        .then(resp=>{
            console.log(resp.data);
            setCourses(resp.data)})
        .catch(e=>console.log(e))

    }
    
    useEffect(()=>{
        getCourses();
    },[acitonType])



    const createCourse = async (e)=>{
        e.preventDefault();
        try {
            if(newCourseName&&courseDescription){
                await axios({method:"POST",url: apiPath.courses, data:{name:newCourseName, description: courseDescription}})
                const resp =  await axios({url: apiPath.courses});
                console.log(resp.data);
                setCourses(resp.data);

                setNewCourseName("");
                setCourseDescription("")
                setMissingField(false);
        }else{
            setMissingField(true);
        }
    } catch (error) {
            console.log(error)
        }
    }


    const deleteCourse =  (id) => {
        axios({method:"DELETE",url: `${apiPath.courses}/${id}`})
        .then(resp=>console.log(resp.data))
        .then(()=>getCourses())
        .catch(e=>console.log(e))
    }


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
    </div>


}