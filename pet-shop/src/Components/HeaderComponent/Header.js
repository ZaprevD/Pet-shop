import React from "react";
import "./header.css";
import { FaBars } from "react-icons/fa";
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
                <div className="small-menu">
                <FaBars className="hamburger-menu-bars" />
                    <ul className="main-list">
                        <NavLink exact to="/"><li>Дома</li></NavLink>
                        <NavLink to="/about"><li>За нас</li></NavLink>
                        <NavLink to="/products"><li>Производи</li></NavLink>
                        <NavLink to="/contact"><li>Контакт</li></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Header;