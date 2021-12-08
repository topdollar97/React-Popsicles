import React, {useState} from "react";
import Header from "./components/head";
import RosterCreate from "./components/roster";
import StickList from './components/sticks';
import { GoogleAuthProvider } from "./components/googleAuth/googleAuth";

const App = () =>{
    document.body.style.backgroundColor="gainsboro"
    const [currTab, setCurrTab] = useState(0);
    if(!currTab){
        setCurrTab("Popsicle Sticks")
    }

    const pages = () =>{
        if(currTab ==="Create Roster"){
            return(
                <div  className="ui padded container">
                    <RosterCreate />
                </div>
            )
        } else if(currTab==="Popsicle Sticks"){
            return(<StickList />)
        } else{
            return(<StickList />)
        }
    }
    return(
        <div>
            <GoogleAuthProvider >
                <Header currTab={currTab} setCurrTab={setCurrTab} />
                {pages()}
            </GoogleAuthProvider>
        </div>
    );
};

export default App;