import React from "react";
import "./header.css";
import { NavLink } from 'react-router-dom';
const Header = props => {

    return (
        <div className="header-box">
            <div className="box-50">
                <div className="image-holder">
                    <img src={require('../../petlogo.jpg')} alt="logo" />
                </div>
            </div>
            <div className="box-50">
                <ul className="main-list">
                    <NavLink exact to="/"><li>Home</li></NavLink>
                    <NavLink to="/about"><li>About us</li></NavLink>
                    <NavLink to="/products"><li>Products</li></NavLink>
                    <NavLink to="/contact"><li>Contact</li></NavLink>
                </ul>
            </div>
        </div>
    )

}

export default Header;