import React from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import CardStyle from "./CardStyle.module.css";

export const Card = ({list}) => {
    console.log(list);

 
    return <>
        <p className={CardStyle["card__title"]}>Administrator Actions</p>
        <div className={CardStyle["card__group"]}>
        {list.map(card=><Link to={card.pagePath} className={CardStyle["card__card"]} key={nanoid(10)}>{card.name}</Link>)}
    </div>
    </>

}