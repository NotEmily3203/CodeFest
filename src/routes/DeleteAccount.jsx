import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../styles/UserFiles.css';
import backgroundImage from '../assets/destination.png';

function DeleteAccount() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    const reauthenticate = (currentPassword) => {
        const user = auth.currentUser;
        const cred = EmailAuthProvider.credential(user.email, currentPassword);
        return reauthenticateWithCredential(user, cred);
    };

    const handleDeleteAccount = () => {
        reauthenticate(password).then(() => {
            const user = auth.currentUser;
            deleteUser(user).then(() => {
                //console.log("Account deleted");
                sessionStorage.removeItem("accessToken");
                navigate('/');
                location.reload();
                alert("Account deleted successfully!")
            }).catch(() => {
                console.error("Error deleting account");
            });
        }).catch(() => {
            console.error("Reauthentication failed");
        });
    };

    return (
        <div className="fullscreen-flex-container"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2 className="title-text">Delete Account</h2>
            <form className="centered-form-wrapper" onSubmit={(e) => { e.preventDefault(); handleDeleteAccount(); }}>
                <input
                    className="styled-input"
                    placeholder="Enter Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="primary-button" type="submit">Delete My Account</button>
            </form>
        </div>
    );
}

export default DeleteAccount;
