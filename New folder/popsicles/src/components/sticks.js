import React, { useState, useEffect} from "react";
import axios from "axios";
import Rosterpulls from "./rosterPulls";
import {useGoogleAuth} from "./googleAuth/googleAuth";

const StickList =()=>{
    const {user} = useGoogleAuth();
    const [myRoster, setMyRoster] = useState('');
    const [currRoster, setCurrRoster]= useState('');
    const [rosterChange, setRosterChange]=useState('');
    useEffect(()=>{
        const helper=async()=>{
            const response = await axios.post('https://popsicles-api.herokuapp.com/teacher', { teacher: user});
            setMyRoster(response.data);
        }
        if(user){
            helper();
        }       
        
    }, [user, rosterChange]);
    if(!user){
        return(
            <h1 className="ui centered blue header">Login To Create And View Your Rosters</h1>
        )
    }
    if(!currRoster){
        const rosterBuilder = () => {
            let rosterList=[]
            for(let roster in myRoster.rosters){
                rosterList.push(
                    <div className="ui centered fluid link card" key={roster} onClick={()=>setCurrRoster(roster)} >
                        <div className="ui  content">
                            <div className="ui center aligned header">{roster}</div>
                        </div>
                    </div>
                )
            }
            if(rosterList.length===0){
                return(
                    <h1 className="ui centered green header">Create a New Roster</h1>
                )
            }
            return(rosterList);
        };
        return(
            <div className="ui container">
                <h1 className="ui centered header">Choose Your Roster:</h1>
                {rosterBuilder()}
            </div>
        );
    } else{
        return(
            <Rosterpulls rosterName={currRoster} setRosterChange={setRosterChange} currRoster={myRoster.rosters[currRoster]} setCurrRoster={setCurrRoster}/>
        )
    }
    
};

export default StickList;

