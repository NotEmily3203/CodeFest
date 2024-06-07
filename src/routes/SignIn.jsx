import React, { useState, useEffect } from "react";
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/UserFiles.css';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('auth-background');
        return () => {
            document.body.classList.remove('auth-background');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                sessionStorage.setItem("accessToken", user.user.auth.lastNotifiedUid);
                navigate('/');
                location.reload();
                alert("Signed In successfully!");
            })
            .catch((error) => {
                console.error("ERROR SIGNIN: ", error);
                alert(error.message);
            });
    }

    return (
        <div className='fullscreen-flex-container'>
            <form className='centered-form-wrapper' onSubmit={handleSubmit}>
                <h1 className='title-text'> Sign In </h1>
                <input className='styled-input' type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input className='styled-input' type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className='primary-button' type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
