import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../assets/cart_cross_icon.png";

const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

    // Debugging: Log the all_product and cartItems at the start
    console.log("All Products:", all_product);
    console.log("Cart Items:", cartItems);

    return (
        <div className="cartitems">
            {/* Header for Cart Items */}
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {/* Map through all products */}
            {all_product.map((product) => {
                const productQuantity = cartItems[product.id] || 0;

                console.log("Processing Product ID:", product.id);

                if (productQuantity > 0) {
                    console.log(`Rendering Product: ${product.name}, Quantity: ${productQuantity}`);
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format">
                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="carticon-product-icon"
                                />
                                {/* Product Name */}
                                <p>{product.name}</p>
                                {/* Product Price */}
                                <p>${product.new_price}</p>
                                {/* Product Quantity */}
                                <button className="cartitems-quantity">
                                    {productQuantity}
                                </button>
                                {/* Total Price */}
                                <p>${product.new_price * productQuantity}</p>
                                {/* Remove Button */}
                                <p>
                                    <img
                                        className="cartitems-remove-icon"
                                        src={remove_icon}
                                        onClick={() => {
                                            console.log("Removing Product ID:", product.id);
                                            removeFromCart(product.id);
                                        }}
                                        alt="Remove"
                                    />
                                </p>
                            </div>
                        </div>
                    );
                } else {
                    console.log(`Skipping Product: ${product.name}, Quantity: ${productQuantity}`);
                }
                return null; // Skip rendering for products with zero quantity
            })}

            {/* Cart Totals Section */}
            <div className="cariitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cariitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p> {/* Call the function */}
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cariitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3> {/* Call the function */}
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>

                {/* Promo Code Section */}
                <div className="cartitems-promocode">
                    <p>If you have a promo code, integrate here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="Promo Code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
