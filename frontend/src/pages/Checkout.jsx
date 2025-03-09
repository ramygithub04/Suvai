import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems,
      total: totalAmount,
      user: "Test User", // Replace with actual user data
    };

    // Store order in localStorage for confirmation page
    localStorage.setItem("orderDetails", JSON.stringify(orderData));

    // Send order to backend
    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{totalAmount}</h3>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
