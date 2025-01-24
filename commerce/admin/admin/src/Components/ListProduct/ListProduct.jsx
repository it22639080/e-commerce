import React, { useEffect, useState } from "react";
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        // try {
            // const response = 
            await fetch('http://localhost:4008/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});
            console.log("Fetch Response:", response); // Log the fetch response
            const data = await response.json();
            console.log("Fetched Products Data:", data); // Log the data received from the API
            
        // } catch (error) {
        //     console.error("Error fetching products:", error); // Log fetch errors
        // }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const remove_product =async(id)=>{
        await fetch('http://localhost:4008/removeproduct',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type':'application/json',
            },

            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    return (
        <div className="list-product">
            <h1>All Product List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>

            <div className="listproduct-allproduct">
                <hr />
                {allproducts.map((product, index) => {
    console.log("Image URL in React:", product.image); // Log the exact URL used
    return (
        <div key={index} className="listproduct-format-main listproduct-format">
            <img
                src={product.image}
                alt={""}
                className="listproduct-product-icon"
                onError={(e) => {
                    console.error(`Image failed to load: ${product.image}`);
                    e.target.src = '/path/to/default-image.jpg'; // Use fallback image
                }}
            />

                            <p>{product.name || "Unknown Product"}</p>
                            <p>${product.old_price || "N/A"}</p>
                            <p>${product.new_price || "N/A"}</p>
                            <p>{product.category || "Unknown Category"}</p>
                            <img onClick={()=>{remove_product(product.id)}}className="listproduct-remove-icon" src={cross_icon} alt="Remove" />
        </div>
    );
})}

            </div>
        </div>
    );
};

export default ListProduct;
