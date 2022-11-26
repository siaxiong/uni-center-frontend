import React, {useEffect} from "react";
import { Card } from "../../../Components/Card/Card";
import { Profile } from "../../../Components/Profile/Profile";
import { Outlet } from "react-router-dom";
import AdminHomeStyle from "./AdminHomeStyle.module.css";

export const AdminHome = () => {
    const style = AdminHomeStyle;

    const list = [
        {name:"Assign/Delete Professors To/From Courses", pagePath:"professors"},
        {name:"Create/Delete Courses", pagePath:"courses"},
        {name:"Accept/Delete Users", pagePath:"users"}
    ]
    return <div className={style["Admin-Home-Page"]}>
        <Card list={list} />
    </div>
}