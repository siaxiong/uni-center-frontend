import React from "react";
import { Card } from "../../../Components/Card/Card";
import { Outlet } from "react-router-dom";

export const AdminHome = () => {
    const list = [
        {name:"Assign/Delete Professors To/From Courses", pagePath:"professors"},
        {name:"Add/Delete Courses", pagePath:"courses"},
        {name:"Accept/Delete Users", pagePath:"users"}
    ]
    return <>
    <p>Admin Home Page</p>
    <Card list={list} />
    </>
}