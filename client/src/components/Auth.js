import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

// font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


// styles 
import '../assets/auth.css';

// API request
const postRequest = async (payload, url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await response.json();

    return data;
};

const Auth = ({ state, method, user }) => {

    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [isSigningUp, setIsSigningUp] = useState(false);
    // states for the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // validations
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorVal, setErrorVal] = useState(null);
    // animation
    const [isLoading, setIsLoading] = useState(false);
    // type of the password field 
    const [type, setType] = useState('password');


    // function changes the state
    const handleState = () => {
        setErrorVal(false);
        setIsLoggingIn(prev => !prev);
        setIsSigningUp(prev => !prev);
    };

    // function handles the users form submission request
    const handleSubmit = async (e, url) => {
        e.preventDefault();

        // checking validations
        // my validations could be stricter but for the sake of the task, it is just to make sure that the name exist
        if (!email || !password) {
            setErrorVal('Please enter in your details');
            return;
        }

        // Its a loading animation but this whole api request search is to fast to actual properly enjoy it
        // quite sad :(
        setIsLoading(true);


        //  create payload
        const payload = {
            'email': email,
            'password': password
        };

        // api request
        const data = await postRequest(payload, `auth/${url}`);

        // console.log(data);

        if (data.status === 400) {
            setIsLoading(false);
            setEmailError('');
            setPasswordError('');
            if (data.errors.email) { setEmailError(data.errors.email); }
            if (data.errors.password) { setPasswordError(data.errors.password); }
            return;
        }

        if (data.status === 401) {
            setIsLoading(false);
            setEmailError('');
            setPasswordError('');
            setErrorVal(data.error);
            return;
        }

        if (data.status === 402) {
            setIsLoading(false);
            setEmailError('');
            setPasswordError('');
            setErrorVal(data.error);
            return;
        }

        if (data.status === 403) {
            setIsLoading(false);
            setEmailError('');
            setPasswordError('');
            setErrorVal(data.error);
            return;
        }

        setErrorVal(null);
        setEmail('');
        setPassword('');
        setIsLoading(false);

        if (url === 'signup') {
            console.log('you have successfully signed up');
            return method(data);
        }

        if (url === 'login') {
            console.log('you have successfully logged up');
            return method(data);
        }


    };

    if (state) return <Navigate to="/home" />;
    return (

        <div className="auth-page">
            <h1>Sign in to view your collection of cars</h1>

            <div className="form">
                <form>
                    {isLoggingIn && <h3>Log in</h3>}
                    {isSigningUp && <h3>Sign up</h3>}
                    <input className='emailInput' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="error">{emailError}</div>
                    <div className="passwordInput">
                        <input type={type} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button onClick={(e) => {
                            e.preventDefault();
                            if (type === 'password') {
                                setType('text');
                            } else if (type === 'text') {
                                setType('password');
                            }
                        }}><FontAwesomeIcon icon={faEye} /></button>
                    </div>
                    <div className="error">{passwordError}</div>

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
                                <button className='active' onClick={(e) => handleSubmit(e, 'login')} >Login</button>
                                <button className='inactive' onClick={handleState}>Sign up</button>
                            </>}
                            {/* if the user is trying to signup */}
                            {isSigningUp && <>
                                <button className='inactive' onClick={handleState}>Login</button>
                                <button className='active' onClick={(e) => handleSubmit(e, 'signup')}>Sign up</button>
                            </>}
                        </div>}

                </form>

            </div>
            <div >
                {errorVal && <h4 className='errorVal error'>{errorVal}</h4>}
            </div>
        </div>

    );
};

export default Auth;