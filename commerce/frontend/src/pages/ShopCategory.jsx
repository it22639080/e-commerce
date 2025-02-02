import React, { useContext } from "react";
import './CSS/ShopCategory.css';
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from '../components/assets/dropdown_icon.png';
import Item from '../components/Item/Item';

const ShopCategory =( Props)=>{
    const {all_product} =useContext(ShopContext);
    return (
        <div className="shop-category">
         <img src={Props.banner} alt=""  ></img>
<div className="shopcategory-indexsort">
    <p>
        <span> Showing 1-12</span> out of 36 products
    </p>
    <div className="shopcategory-sort">
        Sort sby
        <img src= {dropdown_icon} alt=""/>
    </div>
</div>

<div className="popular-item">
                {all_product.map((item)=>{
                    if(Props.ShopCategory===item.ShopCategory){
                    return <Item key={item} id={item.id} name={item.name} image={item.image } new_price={item.new_price} old_price={item.old_price}/>
  }
  else{
    return null;
  }  })}
            </div>

<div className="shopcategory-loadmore">
    Explore more
</div>
        </div>
    )
}

export default ShopCategory;