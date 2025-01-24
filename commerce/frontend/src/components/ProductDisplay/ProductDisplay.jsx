import React, { useContext } from "react";
import './ProductDisplay.css';
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = (props) => {
    const { product } = props;

    const { addToCart } = useContext(ShopContext);

    // Check if the product object exists
    if (!product) {
        return <div className="productdisplay">Product data is not available.</div>;
    }

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    {/* Use optional chaining to prevent errors */}
                    <img src={product.image || "default_image_url"} alt="" />
                    <img src={product.image || "default_image_url"} alt="" />
                    <img src={product.image || "default_image_url"} alt="" />
                    <img src={product.image || "default_image_url"} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img
                        className="productdisplay-main-img"
                        src={product.image || "default_image_url"}
                        alt={product.name || "Default Product"}
                    />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name || "Default Product Name"}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price || "N/A"}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price || "N/A"}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    A shirt is a piece of clothing worn on the upper body that usually has sleeves, a collar, and a
                    front opening: Materials: Shirts can be made from a variety of materials, including cotton, silk,
                    and linen.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select size</h1>
                    <div className="productdisplay-right-size">
                        <div>S</div>
                        <div>L</div>
                        <div>M</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => addToCart?.(product.id || 0)}>ADD TO CART</button>
                <p className="productdisplay-right-category">
                    <span>Category :</span> Women, T-shirt, Crop tops
                </p>
                <p className="productdisplay-right-category">
                    <span>Tags :</span> Modern, Latest
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
