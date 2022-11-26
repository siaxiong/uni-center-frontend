import React, {useContext} from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import CardStyle from "./CardStyle.module.css";
import { PathContext } from "../ProtectedRoutes/ProtectedRoutes";

export const Card = ({list}) => {
    console.log(list);
    const style = CardStyle;
    const {path, setPath} = useContext(PathContext);

 
    return <div className={[style["Card-Component"]].join(" ")}>
        {/* <p className={CardStyle["card__title"]}>Administrator Actions</p> */}
        {/* <div className={[style["card"]].join(" ")}>
            <header className={style["card-header"]}>
                <p className={style["card-header-title"]}>Administrator Actions</p>
            </header>
        </div> */}
        <div className={[style["card-body"]].join(" ")} >

            {list.map(card=><Link to={card.pagePath} onClick={()=>{setPath("on");}} className={[style["card-item"], style["card"]].join(" ")} key={nanoid(10)}>
                {card.name}</Link>)}
         </div>
    </div>

}