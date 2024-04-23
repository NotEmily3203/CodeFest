import React from "react";
import about1 from "../assets/about1.jpg"
import "./Home.css"
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="home__heading" style={{ backgroundImage: `url(${about1})` }}>
                <div className="home__heading-text">
                    <h1>Travel like a LOCO</h1>
                    <p>What would you like to do today? The possibilities are endless.</p>
                    <button onClick={() => navigate("/travel")}> Travel Generator </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
