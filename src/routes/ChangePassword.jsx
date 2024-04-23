import React, { useState } from 'react';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import '../styles/UserFiles.css';
import backgroundImage from '../assets/destination.png';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const auth = getAuth();
    const user = auth.currentUser;

    const handlePasswordChange = (event) => {
        event.preventDefault();

        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        reauthenticateWithCredential(user, credential).then(() => {
            updatePassword(user, newPassword).then(() => {
                alert('Password updated successfully!');
            }).catch((error) => {
                console.log("Error updating password");
            });
        }).catch((error) => {
            console.log("Error reauthenticating");
        });
    };

    return (
        <div className="fullscreen-flex-container"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2 className="title-text">Change Password</h2>
            <form className="centered-form-wrapper" onSubmit={handlePasswordChange}>
                <div className="styled-input">
                    <h2 className="title-text">Current Password:</h2>
                    <input
                        className="styled-input"
                        placeholder="Enter Current Password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <hr />
                <div className="styled-input">
                    <h2 className="title-text">New Password:</h2>
                    <input
                        className="styled-input"
                        placeholder="Enter New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <hr />

                <button className="primary-button" type="submit">Change Password</button>
            </form>
        </div>
    );
}

export default ChangePassword;
