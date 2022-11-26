import React from "react";
import DefaultLayout_Style from "./DefaultLayout.module.css";

export const DefaultLayout = function({children}){
    const style = DefaultLayout_Style;
    return <div className={style.DefaultLayout}>
        {children}
        <p className={style.footer}>© 2022 University Center</p>
    </div>
}