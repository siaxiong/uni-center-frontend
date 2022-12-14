import React, {useState} from "react";
import PendingStyle from "./PendingStyle.module.css";
import { fetchAPI } from "../../../Utils/fetchAPI";
import { Auth_Types } from "../../../myTypes";


export const PendingPage = function(){
	const style = PendingStyle;

	const data = localStorage.getItem("university-center-user");
	if(!data) throw new Error("no credentials");
	const userData:Auth_Types.Credentials = JSON.parse(data);
	const [userRecord, setUserRecord] = useState<Auth_Types.UserRecord>(userData.userRecord);


	const userArr = Object.entries(userRecord);

	const updateRoleRequest = async function(role:string){
		const data:Auth_Types.UserRecord = await fetchAPI({path:`/users/${userRecord.id}`, method: "PUT", body:{role}});
		userData.userRecord = data;
		localStorage.setItem("university-center-user",JSON.stringify(userData));
		setUserRecord(userData.userRecord);
	};
	return <div className={style["pendingPage"]}>
		<p>Pending Page</p>
		<div>
			<p>User Profile</p>
			{userArr.map((currUser, index)=><p key={index}>{`${currUser[0]}: ${currUser[1]}`}</p>)}
		</div>
		{!userRecord.role ? <>
			<p>Pick a role</p>
			<button onClick={()=>updateRoleRequest("Admin")}>Admin</button>
			<button onClick={()=>updateRoleRequest("Professor")}>Professor</button>
			<button onClick={()=>updateRoleRequest("Student")}>Student</button>
		</> : <p>Waiting for the university to make a decision on your enrollment request.</p>}

	</div>;
};