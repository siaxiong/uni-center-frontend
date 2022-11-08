import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin_UsersStyle from "./UsersStyle.module.css";


export const Users = () => {
    const style = Admin_UsersStyle;

    const [pendingUsers, setPendingUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        // axios({url:"/api/admin/enrollingUsers"})
        // .then(resp=>setPendingUsers(resp.data))
        // .catch(e=>console.log(e))
        getpendingUsers();
    },[])




    const getpendingUsers =  ()=>{
        axios({url:"/api/admin/enrollingUsers"})
        .then(resp=>{
            console.log(resp.data);
            setPendingUsers(resp.data);
        })
        .catch(e=>console.log(3));

    }

    const acceptPendingUser = (email)=>{
        console.log("acceptPendingUser()")
        axios({method:"PUT",url:"/api/admin/enrollingUsers", data:{ action: "ACCEPT",email}})
        .then(resp=>console.log(resp))
        .then(()=>getpendingUsers())
        .catch(e=>console.log(e))
    }

    const rejectPendingUser = (email)=>{
        axios({method:"PUT",url:"/api/admin/enrollingUsers", data:{ action: "REJECT",email}})
        .then(resp=>console.log(resp))
        .then(()=>getpendingUsers())
        .catch(e=>console.log(e))

    }



    return <div className={style["pendingUsers__page"]}>
        <p>Accept or reject the users trying to enroll as their requested role.</p>
        <div className={style["list__component"]}>
            <ul>
                {pendingUsers.map((item, index)=>
                <li key={item.email}>
                        <p>{`${index+1})`}</p>
                        <div>
                            <p>{`${item.id}`}</p>
                            <p>{`${item.email}`}</p>
                            <p>{`${item.name}`}</p>
                            <p>{`${item.role}`}</p>
                        </div>
                        <div className={style["list__btn-group"]}>
                            <button type="click" className={style["button"]} onClick={()=>acceptPendingUser(item.email)} >Accept</button>
                            <button type="click" className={style["button"]} onClick={()=>rejectPendingUser(item.email)} >Reject</button>
                        </div>
                </li>)}
            </ul>
        </div>
    </div>
}