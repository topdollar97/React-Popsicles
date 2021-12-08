import React, { useState } from "react";
import axios from "axios";
import { useGoogleAuth } from "./googleAuth/googleAuth";


const Rosterpulls = ({rosterName , setRosterChange, currRoster, setCurrRoster}) =>{
    const {user} = useGoogleAuth();
    const [pulledList, setPulledList] = useState('');
    const [randNameFinal, setRandNameFinal] = useState('');
    const rosterList =currRoster.filter(x=>!pulledList.includes(x));
    const renderList = [];
    const [removeRoster, setRemoveRoster] = useState(false);
    const rosterBuilder = () => {
        for(let roster in rosterList){
            renderList.push(
                <div  style={{backgroundColor:"burlywood"}} className="ui centered fluid link card" key={rosterList[roster]} >
                    <div className="ui content">
                        <div className="ui center aligned header">{rosterList[roster]}</div>
                    </div>
                </div>
            )
        }
        return(renderList);
    };
    const drawName = () =>{
        if(rosterList.length > 0){
            let counter = rosterList.length
            let randName= rosterList[Math.floor(Math.random()*counter)];
            setRandNameFinal(randName)
            setPulledList([...pulledList, randName]);
        }


    }
    const sendDeleteRequest=async ()=>{
        await axios.delete('https://popsicles-api.herokuapp.com/roster', {data:{teacher: user,roster: rosterName}});
        setRosterChange();
        setCurrRoster();
    }
    const resetPulls= () =>{
        setPulledList([]);
        setRandNameFinal();
    }
    const goBack = () =>{
        setCurrRoster();
    };
    const switchRemoveRoster =()=>{
        removeRoster ? setRemoveRoster(false): setRemoveRoster(true)
    }
    const removeRosterAlert = () =>{
        if(removeRoster){
            return(
                <div className="ui red message">
                    <h2 className="ui centered header">Are you sure you want to delete this roster?</h2> 
                    <br />
                    <button className="ui massive button" onClick={()=>switchRemoveRoster()}>Cancel</button>
                    <button className="ui red massive right floated button" onClick={()=>sendDeleteRequest()}>I am sure!</button>
                </div>
            )
        }
        
    }
    const pullWinner = () =>{
        if(randNameFinal){
            return(
                <div className="ui green message">
                <h2 className="ui centered header">And the winner is...</h2> 
                <br />
                <h1 className="ui centered red header">{randNameFinal.toUpperCase()}</h1>
            </div>
            )
        }
    }
    return(
        <div>
            <h1 className="ui centered header">{rosterName}</h1>
            <div className="ui container">
                <div className="ui massive blue button" onClick={()=>goBack()}>View all Rosters</div>
                <div className="ui massive red right floated button" onClick={()=>switchRemoveRoster()}>Delete Roster</div>
                {removeRosterAlert()}
            </div>
            <br />
            <div className="ui container">
                {pullWinner()}
                <br/>
                <div className="ui teal fluid massive button" onClick={()=>drawName()}>Draw a Name</div>
                <br />
                <div className="ui red fluid massive button" onClick={()=>resetPulls()}>Reset Pulls</div>
                <br />
                <h2 className="ui centered header">Names: </h2>
                {rosterBuilder()}
            </div>
        </div>
    )
}

export default Rosterpulls;