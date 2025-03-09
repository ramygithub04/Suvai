import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderDetails"));
    if (!orderData) {
      navigate("/"); // Redirect to home if no order found
    } else {
      setOrderDetails(orderData);
    }
  }, [navigate]);

  return (
    <div className="order-confirmation">
      <h2>🎉 Order Placed Successfully!</h2>
      {orderDetails ? (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{orderDetails.total}</h3>
        </div>
      ) : (
        <p>Loading order details...</p>
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;
