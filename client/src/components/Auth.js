import React from 'react';
import { useState } from 'react';

// styles 
import '../assets/auth.css';

// GET requests
// sign up
const signup_postRequest = async () => {
    const response = await fetch('/auth/signup/');
    const data = await response.json();

    if (!data.ok) {
        return console.log('Oops, something went wrong');
    }

    return data;
};

// Login
const login_postRequest = async () => {
    const response = await fetch('/auth/login/');
    const data = await response.json();

    if (!data.ok) {
        return console.log('Oops, something went wrong');
    }

    return data;


};


const Auth = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [data, setData] = useState('');
    // states for the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorVal, setErrorVal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // function changes the state
    const handleState = () => {
        setErrorVal(false);
        setIsLoggingIn(prev => !prev);
        setIsSigningUp(prev => !prev);
    };

    // function handles the specific request
    const handleSignUp = async (e) => {
        e.preventDefault();

        // checking validations
        // my validations could be stricter but for the sake of the task, it is just to make sure that the name exist
        if (!email) {
            return setErrorVal(true);
        }
        if (!password) {
            return setErrorVal(true);
        }

        // api request
        const data = await signup_postRequest();

        console.log(data.message);

        setErrorVal(false);
        setEmail('');
        setPassword('');

    };

    // Function handles a suer trying to sign in
    const handleLogin = async (e) => {
        e.preventDefault();


        // checking validations
        // my validations could be stricter but for the sake of the task, it is just to make sure that the name exist
        if (!email) {
            return setErrorVal(true);
        }
        if (!password) {
            return setErrorVal(true);
        }
        setIsLoading(true);

        // api request
        const data = await login_postRequest();

        console.log(data.message);

        setErrorVal(false);
        setEmail('');
        setPassword('');
        setIsLoading(false);
    };
    return (
        <div className="auth-page">
            <h1>Sign in to view your collection of cars</h1>

            <div className="form">
                <form>
                    {isLoggingIn && <h3>Log in</h3>}
                    {isSigningUp && <h3>Sign up</h3>}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {isLoading ? <div className='loading'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div> :
                        <div className="buttons">
                            {/* depending on the state, certain buttons will be active that contain certain functions */}
                            {/* if the user is trying to log in */}
                            {isLoggingIn && <>
                                <button className='active' onClick={handleLogin} >Login</button>
                                <button className='inactive' onClick={handleState}>Sign up</button>
                            </>}
                            {/* if the user is trying to signup */}
                            {isSigningUp && <>
                                <button className='inactive' onClick={handleState}>Login</button>
                                <button className='active' onClick={handleSignUp}>Sign up</button>
                            </>}
                        </div>}

                </form>

            </div>
            <div >
                {errorVal && <h4 className='errorVal'>Please enter the correct details</h4>}
            </div>
        </div>
    );
};

export default Auth;