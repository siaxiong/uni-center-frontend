import React, { useState, useEffect } from "react";
import axios from "axios";
import CoursesStyle from "./CoursesStyle.module.css";
import GlobalStyle from "../../../../Components/GlobalStyle/GlobalStyle.module.css";

//NEED FIXES
/** 
 * 
 *1. After deleting a course, the immediate next api call to retrieve courses returns the same 
 data. Not sure why. Need to refresh the page to get the updated data from database. 
 */

export const Courses = () => {
    // console.log(Bulma);

    const style = CoursesStyle;

    const [courses, setCourses] = useState([]);
    const [createNewCourse, setCreateNewCourse] = useState(true);
    const [newCourseName, setNewCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("")
    const [checkBoxArr, setcheckBoxArr] = useState([]);
    const [editLists, setEditLists] = useState(false);
    const [missingField, setMissingField] = useState(false);



    const getCourses = ()=>{
        axios({url:"/api/admin/course"})
        .then(resp=>setCourses(resp.data))
        .catch(e=>console.log(e))
    }
    
    useEffect(()=>{
        getCourses();
    },[])



    const createCourse = async (e)=>{
        e.preventDefault();
        try {
            if(newCourseName&&courseDescription){
                await axios({method:"POST",url:"/api/admin/course", data:{course_name:newCourseName, description: courseDescription}})
                const resp =  await axios({url:"/api/admin/course"});
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


    const deleteCourse =  (course_id) => {
        axios({method:"DELETE",url:"/api/admin/course", data:{courses:[course_id]}})
        .then(resp=>console.log(resp.data))
        .then(()=>getCourses)
        .then(resp=>setCourses(resp.data))
        .catch(e=>console.log(e))
    }


    return <div className={style["Courses"]}>
        <p>Courses</p>
        <div className={style["Courses__course"]}>
            <form>
                <input type="text" className={[style["input"],missingField&&!newCourseName ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={(e)=>setNewCourseName(e.target.value)} value={newCourseName} placeholder="Enter Course Name" />
                {missingField&&!newCourseName ? <p className={GlobalStyle["input-field__required-msg"]}>Course name required !</p> : null}
                <textarea className={[style["textarea"],(missingField&&!newCourseName) ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={e=>setCourseDescription(e.target.value)} value={courseDescription} placeholder={"Enter Course Description"} rows={5} cols={5}/>
                {missingField&&!courseDescription ? <p className={GlobalStyle["input-field__required-msg"]}>Course Description required!</p> : null}
                <button type="click" className={style["button"]} onClick={e=>createCourse(e)}> Create New Course</button>
            </form>
        </div>
        <div className={style["list__component"]}>
            <ul>
                {courses.map((item, index)=>
                <li key={item.course_id}>
                        <p>{`${index+1})`}</p>
                        <div>
                            <div>
                                <p>{`Name:`}</p>
                                <p>{`${item.name} ${item.course_id}`}</p>
                            </div>
                            <div>
                                <p>{`Description:`}</p>
                                <p>{`${item.description}`}</p>
                            </div>
                        </div>
                        <button type="click" className={style["button"]} onClick={()=>deleteCourse(item.course_id)}>Delete</button>
                </li>)}
            </ul>
        </div>
    </div>


}