import React from 'react';
import { useParams } from 'react-router-dom';
import './Menu.css';

const restaurantMenus = {
  1: [
    { id: 101, name: 'Paneer Butter Masala', price: 250, image: 'paneer.jpg' },
    { id: 102, name: 'Butter Naan', price: 60, image: 'naan.jpg' }
  ],
  2: [
    { id: 201, name: 'Chicken Biryani', price: 350, image: 'biryani.jpg' },
    { id: 202, name: 'Tandoori Chicken', price: 400, image: 'tandoori.jpg' }
  ]
};

const MenuPage = ({ addToCart }) => {
  const { restaurantId } = useParams();
  const menuItems = restaurantMenus[restaurantId] || [];

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="menu-list">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
