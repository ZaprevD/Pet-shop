import React from "react";
import Home from "./Components/HomeComponent/Home";
import Products from "./Components/ProductsComponent/Products";
import ProductInfoWindow from "./Components/ProductsComponent/ProductInfoWindow";
import About from "./Components/AboutComponent/About";
import Contact from "./Components/ContactComponent/Contact";
import LoginAdmin from "./Components/LoginComponent/LoginAdmin";
import Admin from "./Components/AdminComponent/Admin";
import Header from "./Components/HeaderComponent/Header";
import Users from "./Components/AdminComponent/UsersComponent/Users";
import Categories from "./Components/AdminComponent/CategoriesComponent/Categories";
import ForgotUsername from "./Components/LoginComponent/ForgotUsername";
import ForgotPassword from "./Components/LoginComponent/ForgotPassword";
import { Route, BrowserRouter } from "react-router-dom";

export default () =>
    <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductInfoWindow} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/loginadmin" component={LoginAdmin} />
        <Route exact path="/loginadmin/forgot/username" component={ForgotUsername} />
        <Route exact path="/loginadmin/forgot/password" component={ForgotPassword} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/categories" component={Categories} />
    </BrowserRouter>