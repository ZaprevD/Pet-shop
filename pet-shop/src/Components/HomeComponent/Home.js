import React from "react";
import "./home.css";
import Slider from "./Slider";
const Home = props => {

    return (
            <div className="home-view-container">
                <h1>Производи на акција</h1>
                <Slider />
            </div>
    )
}

export default Home;