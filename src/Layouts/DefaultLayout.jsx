import React from "react";
import DefaultLayout_Style from "./DefaultLayout.module.css";

export const DefaultLayout = function({children}){
    return <div className={DefaultLayout_Style.style}>
        {children}
    </div>
}