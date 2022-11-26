import React, { useContext} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HomeStyle from "./PublicHome.module.css";
import { Form } from "../../../Components/Form/Form";
import { Nav } from "../../../Components/Nav/Nav";



export const PublicHome = function(){
    const style = HomeStyle;
    return <div className={style.PublicHomePage} >

            <div className={ style["item-container"]}>
                <div className={style["description"]}>
                    <h3 className={[style["subtitle"]].join(" ")}>What is University Center?</h3>
                    <p>University Center is a full stack application that contain sofware features a university need to operate.
                    There are three user role in this application. There is the administrator role who can create new courses, accept enrollments, assign courses to professors, etc.
                    For users with a professor role, they can assign assignments to students and grade assignments. For users with a student role, 
                    they can sign up for courses and submit assignments.
                    </p>
                    <p>Many more features to come!</p>
                </div>
                <Form/>
            </div>    
    </div>

}
