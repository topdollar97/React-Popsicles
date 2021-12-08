import React, {useState} from "react";
import axios from "axios";
import { useGoogleAuth} from "./googleAuth/googleAuth";

const RosterCreate = () =>{
    const {user} = useGoogleAuth();
    const [currRoster, setCurrRoster] = useState('');
    const [currName, setCurrName] = useState('');
    const [rosterName, setRosterName] = useState('');
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        setCurrRoster([...currRoster, currName]);
        newName.current.value = "";
    }
    const handleBigSubmit = async () =>{
        await axios.post('https://popsicles-api.herokuapp.com/roster', {title: rosterName,teacher: user,roster: currRoster});
        newRosterName.current.value = "";
        setCurrRoster([]);
    }
    const removeName = (src,name)=>{
        let place = src.indexOf(name);
        currRoster.splice(place,1)
        let newRoster = [...currRoster];
        setCurrRoster(newRoster);
    }
    const newName = React.useRef();
    const newRosterName = React.useRef();
    const createSubmitButton = () =>{
        if(!user){
            return(
                <div className="ui green card">
                    <div className="ui content">
                        <div className="ui center aligned header">Login To Save Roster</div>
                    </div>
                </div>
            )
        }
        return(
            <div className="ui container">
                <button className="ui right floated green massive button" type="submit" onClick={()=>handleBigSubmit()}>Save Roster</button>
            </div>
        )
    }

    const createList= ()=>{
        if(!currRoster){
            return ''
        }
        let count = 0
        return currRoster.map(name=>{
            count ++
            return(
                <div className="ui fluid card" key={count}>
                    <div className="ui content">
                        <div className="ui center aligned header">{name}</div>
                    </div>
                    <button className="negative ui button" onClick={()=>removeName(currRoster,name)}>Remove</button>
                </div>
            )
        });
    };
    return(
        <div>
            <form className="ui padded form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="ui field">
                    <h2 className="ui header">Roster Name</h2>
                    <input type="text" name="roster-name" placeholder="Roster Name" ref={newRosterName} onChange={e=>setRosterName(e.target.value)} />
                </div>
                <div className="ui field">
                    <h2 className="ui header">Student Name</h2>
                    <input type="text" name="first-name" placeholder="First Name" ref={newName} onChange={e=>setCurrName(e.target.value)} />
                </div>
                <button className="ui blue big centered button" type="submit">Save Student To Roster</button>
            </form>
            <br/>
            <div className="ui stackable doubleing four cards">{createList()}</div>
            <br />
            {createSubmitButton()}
        </div>
    );
};

export default RosterCreate;