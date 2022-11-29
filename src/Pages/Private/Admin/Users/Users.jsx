import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin_UsersStyle from "./UsersStyle.module.css";


export const Users = () => {
    const style = Admin_UsersStyle;

    const [allUsers, setAllUsers] = useState([]);
    const [courses, setCourses] = useState([]);


    useEffect(()=>{
        getAllUsers();
    },[])

    const getAllUsers =  ()=>{
        axios({url:"/api/v1/users"})
        .then(resp=>{
            setAllUsers(resp.data);
        })
        .catch(e=>console.log(3));
    }

    const acceptPendingUser = (id)=>{
        console.log("acceptPendingUser()")
        axios({method:"PUT",url:`/api/v1/users/${id}`, data:{enrolled: "ACCEPTED"}})
        .then(resp=>console.log(resp))
        .then(()=>getAllUsers())
        .catch(e=>console.log(e))
    }

    const rejectPendingUser = (id)=>{
        axios({method:"PUT",url:`/api/v1/users/${id}`, data:{enrolled: "REJECTED"}})
        .then(resp=>console.log(resp))
        .then(()=>getAllUsers())
        .catch(e=>console.log(e))

    }

    const permaDeleteUser = (id)=>{
        console.log("*****I disabled the delete user feature so the testing users can't be delete****");
        // axios({method:"DELETE", url:`/api/v1/users/${id}`})
        // .then(resp=>console.log(resp))
        // .then(()=>getAllUsers())
        // .catch(e=>console.log(e))
    }



    return <div className={style["users__page"]}>
        <div className={[style["table-container"], style["box"]].join(" ")}>
            <p className={style["table-title"]}>Accept or reject the users trying to enroll as their requested role</p>
            <table>
                <thead>
                    <tr key={"123ABCrandom"}>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Accept</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    (allUsers.filter(user=>user.enrolled==="PENDING")).map((user,index)=><tr key={user.id}>
                        <td>{`${index+1}`}</td>
                        <td>{`${user.name}`}</td>
                        <td>{`${user.email}`}</td>
                        <td>{`${user.role}`}</td>
                        <td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>acceptPendingUser(user.id)}>Accept</button></td>
                        <td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>rejectPendingUser(user.id)}>Reject</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        <div className={[style["table-container"], style["box"]].join(" ")}>
            <p className={style["table-title"]}>{`All users (including accepeted and rejected users)`}</p>
            <p>*****I disabled the delete user feature so the testing users can't be delete****</p>

            <table>
                <thead>
                    <tr key={"123ABCrandom"}>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Enrolled</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user,index)=><tr key={user.id}>
                        <td>{`${index+1}`}</td>
                        <td>{`${user.name}`}</td>
                        <td>{`${user.email}`}</td>
                        <td>{`${user.role}`}</td>
                        <td>{`${user.enrolled}`}</td>
                        <td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>permaDeleteUser(user.id)}>Permanently Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
}