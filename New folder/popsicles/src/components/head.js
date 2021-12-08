import React, { useEffect, useState } from "react";
import Fullauth from "./googleAuth/full";

const Header = ({currTab, setCurrTab}) =>{
    const [newTab, setNewTab] = useState(0);

    useEffect(()=>{
        setCurrTab(newTab);
    }, [setCurrTab, newTab])

    const clickNewTab = (value) =>{
        if(value === currTab){
            setNewTab('')
        }
        setNewTab(value);
    };

    return(
        <div className="ui pointing menu">
            <div className={currTab==="Popsicle Sticks"? "ui active header link item" : "ui header link item"} onClick={()=>clickNewTab("Popsicle Sticks")}>Popsicle Sticks</div>
            <div className={currTab==="Create Roster"? "ui active header link item" : "ui header link item"} onClick={()=>clickNewTab("Create Roster")}>Create a Roster</div>
            <Fullauth />
        </div>
    );
};

export default Header;