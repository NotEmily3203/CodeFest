import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('home-page-background');
        return () => {
            document.body.classList.remove('home-page-background');
        };
    }, []);

    return (
        <div className="home">
            <div className="home__heading">
                <div className="home__heading-text">
                    <h1>Travel like a LOCO</h1>
                    <p>What would you like to do today? The possibilities are endless.</p>
                    <button onClick={() => navigate("/travel")}>Travel Generator</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
