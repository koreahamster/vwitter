import React from "react";
import { authService, firebaseInstance } from "fBase";
import AuthForm from "components/AuthForm";

const Auth = () => {
    
    
    
    
    const onSocialClick = async (event) => {
        const {target:{name},} = event;
        let provider;
        if(name === "google"){
            provider= new firebaseInstance.auth.GoogleAuthProvider();
        }
        else if(name === "github"){
            provider= new firebaseInstance.auth.GithubAuthProvider();
        }
        else if(name === "facebook"){
            provider= new firebaseInstance.auth.FacebookAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);

        
    }
    return(<div>
            <AuthForm />
        <div>
            <button onClick={onSocialClick} name="google">Continue With Google</button>
            <button onClick={onSocialClick} name="github">Continue With Github</button>
            <button onClick={onSocialClick} name="facebook">Continue With Facebook</button>
        </div>
    </div>
        );
    };
export default Auth;
