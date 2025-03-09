import React from 'react';
import './CartPage.css';

const CartPage = ({ cartItems, removeFromCart }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalAmount}</h3>
          <button className="place-order">Place Order</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
