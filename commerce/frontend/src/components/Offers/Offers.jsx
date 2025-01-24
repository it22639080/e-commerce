import React from "react";
import './Offers.css';
//import './navbar/navbar.jsx';
import exclusive_image from '../assets/exclusive_image.png';
const Offers =()=>{
    return (
        <div className="offers">
            <div className="offers-left">
                <h1> Exclusive</h1>
                <h1> Offers for you</h1>
                <p> ONLY IN BEST SELLERS PRODUCTS</p>
                <button> Check now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt=""/>
            </div>




        </div>
    )
}

export default Offers;

//------------------------Offers.jsx----------------------------------