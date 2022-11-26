import React, { useState, useEffect } from "react";
import ListsStyle from "./ListsStyle.module.css";
import { click } from "@testing-library/user-event/dist/click";


export const ListsComponent = ({listArr, setSelected}) => {
    const [clickedListArr, setClickedListArr] = useState([]);

    const onChecked = (e) => {
        e.preventDefault();
        const newArr = [...clickedListArr];

        if(e.target.checked){
            newArr.push(parseInt(e.target.value));
            setClickedListArr(newArr);
        }else{
            newArr.pop(parseInt(e.target.value));
            setClickedListArr(newArr);
        }
    }

    

    useEffect(()=>{
        console.log(`ListsArr: ${clickedListArr}`);
        setSelected(clickedListArr);

    }, [clickedListArr])

    
        return <div className={ListsStyle["list-component"]}>
            <ul>
                {lists.map((item, index)=>
                <li key={item.id}>
                        <p>{`${index+1})`}</p>
                        <div>
                            <div>
                                <p>{`Course Name: ${item.name}`}</p>
                                <p>{`Course ID: ${item.id}`}</p>
                            </div>
                            <div>
                                <p>{`Description ${item.description}`}</p>
                            </div>
                        </div>
                        <button type="click" className={style["button"]} onClick={()=>deleteCourse(item.id)}>Delete</button>
                </li>)}
            </ul>
        </div>
}