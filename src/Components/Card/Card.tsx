import React from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import CardStyle from "./CardStyle.module.css";
import { Auth_Types } from "../../myTypes";

type CardProps = {
	list: Auth_Types.CardItemType[],}

export const Card = ({list}:CardProps) => {
	console.log("🚀 ~ file: Card.tsx:11 ~ Card ~ list", list);
	const style = CardStyle;
	

	return <div className={[style["Card-Component"]].join(" ")}>
		<div className={[style["card-body"]].join(" ")} >
			
			{list.map(card=><Link to={`${card.pagePath}?id=${card.id}`} className={[style["card-item"], style["card"]].join(" ")} key={nanoid(10)}>
				{card.name}</Link>)}
		</div>
	</div>;
};

