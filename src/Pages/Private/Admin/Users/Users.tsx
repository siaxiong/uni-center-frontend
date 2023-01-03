import React, { useState, useEffect } from "react";
import Admin_UsersStyle from "./UsersStyle.module.css";
import {Auth_Types} from "../../../../myTypes";
import {fetchAPI} from "../../../../Utils/fetchAPI";


export const Users = () => {
	const style = Admin_UsersStyle;

	const [allUsers, setAllUsers] = useState<Auth_Types.UserRecord[]>();

	useEffect(()=>{
		getAllUsers();

	},[]);

	const getAllUsers = async()=>{
		fetchAPI({path:"/users"})
			.then(data=>setAllUsers(data));
	};
	const acceptPendingUser = async (id:string)=>{
		fetchAPI({path:`/users/${id}`, method:"PUT", body: {enrollmentStatus: "Accepted"}, showSuccess:true})
			.then(()=>getAllUsers());
	};

	const rejectPendingUser = async (id:string)=>{
		fetchAPI({path:`/users/${id}`, method:"PUT", body:{enrollmentStatus:"Rejected"}, showSuccess:true})
			.then(()=>getAllUsers());
	};

	const permaDeleteUser = async(id:string)=>{
		fetchAPI({path:`/users/${id}`, method:"DELETE", showSuccess:true})
			.then(()=>getAllUsers());
	};


	return <div className={style["users__page"]}>
		<div className={[style["table-container"], style["box"]].join(" ")}>
			<p style={{backgroundColor: "hsl(44deg, 100%, 77%)"}}>Use the top left arrow to go back to the prev. page. </p>
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
						(allUsers?.filter(user=>user.enrollmentStatus==="Pending"))?.map((user,index)=><tr key={user.id}>
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
			<p className={style["table-title"]}>{"All users (including accepted and rejected users)"}</p>
			<p>*****I disabled the delete user feature so the testing users cant be delete****</p>

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
					{allUsers?.map((user,index)=><tr key={user.id}>
						<td>{`${index+1}`}</td>
						<td>{`${user.name}`}</td>
						<td>{`${user.email}`}</td>
						<td>{`${user.role}`}</td>
						<td>{`${user.enrollmentStatus}`}</td>
						<td><button className={[style["button"], style["is-warning"]].join(" ")} onClick={()=>permaDeleteUser(user.id)}>Permanently Delete</button></td>
					</tr>)}
				</tbody>
			</table>
		</div>
	</div>;
};