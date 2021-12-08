import React from "react";
import { GoogleAuthProvider } from "./googleAuth";
import { useGoogleAuth } from "./googleAuth";

const Fullauth = () =>{
    const { googleAuth, user, setUser } = useGoogleAuth();
    const LoginButton = () => {
        const signInAction = async () =>{
            const response = await googleAuth.signIn()
            console.log(response);
            setUser(response.Ba)
        }
        if(user){
            return(<div></div>)
        }
        return (
            <button className="ui green google button" onClick={signInAction}>
                <i className="google icon" />
                Login
            </button>
          );
    };
    const LogoutButton = () => {
        const { googleAuth } = useGoogleAuth();
        const signOutAction = () =>{
            googleAuth.signOut();
            setUser(null);
        };

        if(user){
            return (
                <button className="ui red google button" onClick={signOutAction}>
                    <i className="google icon" />
                    Logout
                </button>
              );
        } else{
            return(<div></div>)
        }
    };

    return(
        <div className="ui right header item">
            <GoogleAuthProvider >
                <LoginButton />
                <LogoutButton />
            </GoogleAuthProvider>
        </div>
    );
};

export default Fullauth;