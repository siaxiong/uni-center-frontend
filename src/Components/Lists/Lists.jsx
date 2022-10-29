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

    
        return <div className={ListsStyle["list__component"]}>
            <ul>
                {listArr.map((item, index)=><li key={item.course_id}>
                    <div>
                        <p>{`${index+1}) ${item.name}`}</p>
                        <input type="checkbox" name="itemId" value={item.course_id} checked={clickedListArr.find(element=>element===item.course_id)} onChange={e=>onChecked(e)} />
                    </div>
                </li>)}
            </ul>
        </div>
}