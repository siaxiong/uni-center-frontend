import React from "react";
import { Outlet } from "react-router-dom";

export const StudentLayout = () => {
    return <div>
        <p>Student Layout</p>
        <Outlet/>
    </div>;
}