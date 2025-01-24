import React, { useContext, useState } from "react";
import './navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => { 
    
    const [menu,setmenu]= useState("shop");
    const {getTotalCartItems}= useContext(ShopContext)
    // Change `navbar` to `Navbar`
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="logo"/>
                <p> SHOPPER </p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setmenu("shop")}}><Link style = {{textDecoration: 'none'}} to ='/'> shop </Link> {menu === "shop"? <hr/> : <></>}</li>
                <li onClick={()=>{setmenu("mens")}}><Link style = {{textDecoration: 'none'}} to ='/mens'> men </Link> {menu === "mens"? <hr/> : <></>}</li>
                <li onClick={()=>{setmenu("womens")}}> <Link style = {{textDecoration: 'none'}} to ='/womens'> women </Link> {menu === "womens"? <hr/> : <></>}</li>
                <li onClick={()=>{setmenu("kids")}}> <Link style = {{textDecoration: 'none'}} to ='/kids'>kids </Link> {menu === "kids"? <hr/> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
  {localStorage.getItem('auth-token') 
    ? <button onClick={() => { 
        localStorage.removeItem('auth-token'); 
        window.location.replace('/'); 
      }}> Logout </button>
    : <Link to='/login'> <button> login </button> </Link>}
  <Link to='/cart'><img src={cart_icon} alt=""/></Link>
  <div className="nav-cart-count"> {getTotalCartItems()} </div>
</div>

        </div>
    );
}

export default Navbar;  // Change `navbar` to `Navbar`
