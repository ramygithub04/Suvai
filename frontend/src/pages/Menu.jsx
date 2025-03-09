import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const menuData = {
  1: [
    { id: 1, name: 'Spicy Chicken Curry', price: 12.99 },
    { id: 2, name: 'Paneer Tikka', price: 10.99 },
    { id: 3, name: 'Veg Biryani', price: 9.99 },
  ],
  2: [
    { id: 1, name: 'Royal Thali', price: 15.99 },
    { id: 2, name: 'Butter Chicken', price: 13.99 },
    { id: 3, name: 'Garlic Naan', price: 3.99 },
  ],
  3: [
    { id: 1, name: 'Tandoori Chicken', price: 14.99 },
    { id: 2, name: 'Dal Makhani', price: 11.99 },
    { id: 3, name: 'Raita', price: 2.99 },
  ],
  4: [
    { id: 1, name: 'Pasta Primavera', price: 12.99 },
    { id: 2, name: 'Margherita Pizza', price: 10.99 },
    { id: 3, name: 'Caesar Salad', price: 8.99 },
  ],
  5: [
    { id: 1, name: 'Chocolate Cake', price: 6.99 },
    { id: 2, name: 'Fruit Tart', price: 5.99 },
    { id: 3, name: 'Ice Cream Sundae', price: 4.99 },
  ],
};

const MenuPage = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items based on restaurant ID
    const items = menuData[id] || [];
    setMenuItems(items);
  }, [id]);

  const handleAddToCart = (item) => {
    // Logic to add item to cart
    console.log(`Added to cart: ${item.name} - $${item.price}`);
    // You can implement a cart state or context to manage cart items
  };

  return (
    <div className="menu-container">
      <h2>Menu for Restaurant ID: {id}</h2>
      {menuItems.length > 0 ? (
        <div className="menu-items">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No menu items available for this restaurant.</p>
      )}
    </div>
  );
};

export default MenuPage;