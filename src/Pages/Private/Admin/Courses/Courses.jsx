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

    const [courses, setCourses] = useState([]);
    const [createNewCourse, setCreateNewCourse] = useState(true);
    const [newCourseName, setNewCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("")
    const [checkBoxArr, setcheckBoxArr] = useState([]);
    const [editLists, setEditLists] = useState(false);
    const [missingField, setMissingField] = useState(false);

    // useEffect(()=>{
    //    fetchCourses();
    // },[])

    useEffect(()=>{
        fetchCourses();

    },[editLists])


    const fetchCourses = async ()=>{
        console.log("fetechCourses()")
        await axios({url:"/api/admin/course"})
        .then(resp => {
            console.log("🚀 ~ file: Courses.jsx ~ line 23 ~ fetchCourses ~ resp", resp)
            setCourses(resp.data);
        })
        .catch(e=>console.log(e))
    }

    const createCourse = async (e)=>{
        e.preventDefault();
        if(newCourseName&&courseDescription){
            await axios({method:"POST",url:"/api/admin/course", data:{course_name:newCourseName, description: courseDescription}})
            .then(resp=>console.log(resp))
            .catch(e=>console.log(e))

    
            await axios({url:"/api/admin/course"})
            .then(resp=>{
                setCourses(resp.data);
            })
            .catch(e=>console.log(e))

            setNewCourseName("");
            setCourseDescription("")
            setMissingField(false);

        }else{
            setMissingField(true);
        }
    }

    const deleteCourses = async () => {
        console.log("DeleteCourses()")
        console.log(`CoursesArr: ${JSON.stringify(courses)}`);
        if(checkBoxArr.length > 0){
            await axios({method:"DELETE",url:"/api/admin/course", data:{courses:checkBoxArr}})
            .then(resp=>{
                console.log(resp)
                setEditLists(false);
            })
            .catch(e=>console.log(e))
        }
    }


    const onEditListClick = ()=>{
        setEditLists(!editLists);
        setcheckBoxArr([]);
    }

    const onChecked = (e) => {        
        const newArr = [...checkBoxArr];
        if(e.target.checked){
            console.log("CHECKED!")
            newArr.push(parseInt(e.target.value));
            setcheckBoxArr(newArr);

        }else{
            console.log("UNCHECKED!")
            console.log(newArr.filter(id=>id!==parseInt(e.target.value)))
            setcheckBoxArr(newArr.filter(id=>id!==parseInt(e.target.value)));
        }

    }



    return <div className={CoursesStyle["Courses"]}>
        <p>Courses</p>
        <div className={CoursesStyle["Courses__course"]}>
            <form>
                <input type="text" className={[missingField&&!newCourseName ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={(e)=>setNewCourseName(e.target.value)} value={newCourseName} placeholder="Enter Course Name" />
                {missingField&&!newCourseName ? <p className={GlobalStyle["input-field__required-msg"]}>Course name required !</p> : null}
                <textarea className={[missingField&&!newCourseName ? GlobalStyle["input-field__required"] : null].join(" ")} onChange={e=>setCourseDescription(e.target.value)} value={courseDescription} placeholder={"Enter Course Description"} rows={5} cols={5}/>
                {missingField&&!courseDescription ? <p className={GlobalStyle["input-field__required-msg"]}>Course Description required!</p> : null}
                <button type="submit" onClick={e=>createCourse(e)}> Create New Course</button>
            </form>
        </div>
        <div className={CoursesStyle["list__component"]}>
            <button type="button" onClick={()=>onEditListClick()}>Edit</button>
            {(checkBoxArr.length > 0) ? <button type="button" onClick={()=>deleteCourses()}>Delete</button> : null}
            <ul>
                {courses.map((item, index)=>
                <li key={item.course_id}>
                    <div>
                        <p>{`${index+1}) ${item.name}`}</p>
                        <input key={item.course_id} type="checkbox" className={[CoursesStyle["list__checkbox"], editLists ? CoursesStyle["list__edit"] : null ].join(" ")} name="itemId" value={item.course_id}  onChange={e=>onChecked(e)} />
                    </div>
                    <p className={CoursesStyle["item-description"]}>{`Description: ${item.description}`}</p>

                </li>)}
            </ul>
        </div>
    </div>


}