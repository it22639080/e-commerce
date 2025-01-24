import React from "react";
import './Breadcrumps.css';
import arrow_icon from '../assets/breadcrum_arrow.png';

const Breadcrumps = (props) => { 
    // Explicitly pass props as an argument
    const { product } = props; // Destructure product from props
    
    // Add fallback handling for undefined product or missing properties
    const category = product?.category || "Unknown Category";
    const name = product?.name || "Unknown Product";

    return (
        <div className="breadcrump">
            Home
            <img src={arrow_icon} alt=""/> Shop <img src={arrow_icon} alt=""/>
            {category} <img src={arrow_icon} alt=""/> {name}
        </div>
    );
};

export default Breadcrumps;
