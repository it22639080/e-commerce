//-----------------------------ShopContext.jsx-----------------

import React, { createContext, useEffect, useState } from "react"; // Added useState to the import
import all_product from '../components/assets/all_product'; // Ensure this is correctly imported

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const[all_product,setAll_product]= useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4008/allproducts')
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Log all fetched products
            setAll_product(data);
          });

          if(localStorage.getItem('auth-token'))
          {
            fetch('http://localhost:4008/getcart',{
                method:'POST',
                headers:{
                    Accept:'Application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));
          }
      }, []);
      

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
        if(localStorage.getItem('auth-token'))
        {
            fetch('http://localhost:4008/addtocart',{
                method:'POST',
                headers:{
                    Accept:'Application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            } )

            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
       // console.log(cartItems);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
        if(localStorage.getItem('auth-token'))
        {
            {
                fetch('http://localhost:4008/removefromcart',{
                    method:'POST',
                    headers:{
                        Accept:'Application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({"itemId":itemId}),
                } )
    
                .then((response)=>response.json())
                .then((data)=>console.log(data));
            }}
        
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) =>
                    product.id === Number(item)
                );
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount; // Return the total amount after the loop
    };

    const getTotalCartItems =()=>{
        let totlalItem=0;
        for( const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totlalItem+= cartItems[item];
            }
        }
        return totlalItem;
    }
    

    const contextValue = { getTotalCartAmount, getTotalCartItems,all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
