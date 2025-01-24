import React, { useEffect, useState } from "react";
import './Popular.css';
//import data_product from "../assets/data";
import Item from "../Item/Item";

const Popular =()=>{

    const [popularproducts, setPopularproducts]= useState([]);
    useEffect(()=>{

        fetch('http://localhost:4008/popularinwomen')
        .then((response)=>response.json())
        .then((data)=>setPopularproducts(data));
    },[])

    return (
        <div className="popular">
            <h1> POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {popularproducts.map((item)=>{
                    return <Item key={item} id={item.id} name={item.name} image={item.image } new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>

        </div>
    )
}

export default Popular;

//-------------------Popular.jsx---------------------------