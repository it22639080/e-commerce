import React from "react";
import './DescriptionBox.css';
const DescriptionBox =()=>{
    return (
        <div className="descriptionbox">
           <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box ">Description </div>
            <div className="descriptionbox-nav-box fade">Reviews (122) </div>

           </div>
           <div className="descriptionbox-description">
            <p> A shirt is a piece of clothing worn on the upper body that usually has sleeves, a collar, and a front opening: 
            Materials: Shirts can be made from a variety of materials, including cotton, silk, and linen </p>
            <p>
            A shirt is a piece of clothing worn on the upper body that usually has sleeves, a collar, and a front opening: 
            Materials: Shirts can be made from a variety of materials, including cotton, silk, and linen
            </p>
           </div>
        </div>
    )
}
export default DescriptionBox;