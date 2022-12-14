import React from "react";
import AdminLayoutStyle from "./AdminLayout.module.css";
import { Outlet, Link } from "react-router-dom";
import { Profile } from "../../../Components/Profile/Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
	faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export const AdminLayout = () => {
	const style = AdminLayoutStyle;

	return <div className={style["Admin-Layout"]}>
		<Profile />
		<div className={style["pages"]}>
			<div className={[style["nav"]].join(" ")} >
				{/* <div className={ path==="on" ? style["backward-button-show"] : style["backward-button-hidden"]} >
					<Link to={"/admin"} onClick={()=>setPath("off")}><FontAwesomeIcon icon={faArrowLeft}/></Link>
				</div> */}
				<div className={[style["card"]].join(" ")}>
					<header className={style["card-header"]}>
						<p className={style["card-header-title"]}>Administrator Actions</p>
					</header>
				</div>
			</div>
			<Outlet/>
		</div>
	</div>;
};