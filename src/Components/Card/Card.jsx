import React, {useContext} from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import CardStyle from "./CardStyle.module.css";
import { PathContext } from "../ProtectedRoutes/ProtectedRoutes";

export const Card = ({list}) => {
    const style = CardStyle;
    const {path, setPath} = useContext(PathContext);

 
    return <div className={[style["Card-Component"]].join(" ")}>
        <div className={[style["card-body"]].join(" ")} >

            {list.map(card=><Link to={card.pagePath} onClick={()=>{setPath("on");}} className={[style["card-item"], style["card"]].join(" ")} key={nanoid(10)}>
                {card.name}</Link>)}
         </div>
    </div>

}