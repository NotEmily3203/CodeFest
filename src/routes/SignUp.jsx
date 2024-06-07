import React, { useState, useEffect } from "react";
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/UserFiles.css';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('auth-background');
        return () => {
            document.body.classList.remove('auth-background');
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((user) => {
                    console.log(user);
                    navigate('/');
                    location.reload();
                    alert("Signed up successfully! Please Sign In to continue");
                })
                .catch((error) => {
                    console.error("ERROR SIGNUP: ", error);
                    alert(error.message);
                });
        } else {
            alert("Passwords do not match");
        }
    }

    return (
        <div className="fullscreen-flex-container">
            <form className="centered-form-wrapper" onSubmit={handleSubmit}>
                <h1 className="title-text">Sign Up</h1>
                <p className="styled-link">Already have an account? <a href="/signin">Sign In</a></p>
                <input className="styled-input" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <br />
                <input className="styled-input" type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <br />
                <input className="styled-input" type="password" value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <br />
                <hr />
                <button className="primary-button" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
