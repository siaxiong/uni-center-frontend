import React, { useEffect,useState} from "react";
import axios from "axios";

export const Professors = () => {
    const [courses, setCourses] = useState([]);
    
    useEffect(()=>{
        axios({url:"/api/admin/course"})
        .then(resp=>{
            console.log(resp.data);
            setCourses(resp.data);
        })
        .catch(e=>console.log(e))
    },[])

    return <div>
        <p>Professors</p>
    </div>
}