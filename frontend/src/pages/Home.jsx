import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { userType, restaurants, adminMenu, addRestaurant, addProduct } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [newRestaurant, setNewRestaurant] = useState({ name: '', location: '', image: '' });
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [addType, setAddType] = useState('restaurant');
  const navigate = useNavigate();

  const prevRestaurant = () => {
    if (index > 0) setIndex(index - 1);
  };

  const nextRestaurant = () => {
    if (index < restaurants.length - 3) setIndex(index + 1);
  };

  const handleRestaurantClick = (id) => {
    navigate(`/menu/${id}`);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (addType === 'restaurant') {
      addRestaurant(newRestaurant);
    } else {
      addProduct(selectedRestaurant, newProduct);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="quote">"Good food is the foundation of genuine happiness."</div>
      </div>

      {userType === 'customer' ? (
        <>
          <div className="Explore">Explore the variety of restaurants</div>
          <div className="restaurant-section">
            <button className="left-btn" onClick={prevRestaurant} disabled={index === 0}>&lt;</button>

            <div className="restaurant-list">
              {restaurants.slice(index, index + 3).map((restaurant) => (
                <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                  <img src={restaurant.image} alt={restaurant.name} />
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.location}</p>
                </div>
              ))}
            </div>

            <button className="right-btn" onClick={nextRestaurant} disabled={index === restaurants.length - 3}>&gt;</button>
          </div>
        </>
      ) : (
        <div className="admin-section">
          <h2>Manage Your Menu</h2>
          <form className="add-form" onSubmit={handleAddSubmit}>
            <label>
              <input type="radio" value="restaurant" checked={addType === 'restaurant'} onChange={() => setAddType('restaurant')} />
              Add Restaurant
            </label>
            <label>
              <input type="radio" value="product" checked={addType === 'product'} onChange={() => setAddType('product')} />
              Add Product
            </label>

            {addType === 'restaurant' ? (
              <>
                <input type="text" placeholder="Restaurant Name" value={newRestaurant.name} onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} required />
                <input type="text" placeholder="Location" value={newRestaurant.location} onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })} required />
                <input type="text" placeholder="Image URL" value={newRestaurant.image} onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })} required />
              </>
            ) : (
              <>
                <select value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)} required>
                  <option value="">Select Restaurant</option>
                  {restaurants.map((res) => (
                    <option key={res.id} value={res.id}>{res.name}</option>
                  ))}
                </select>
                <input type="text" placeholder="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                <input type="number" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                <input type="text" placeholder="Image URL" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} required />
              </>
            )}
            <button type="submit">Submit</button>
          </form>

          <div className="menu-list">
            {adminMenu.length > 0 ? (
              adminMenu.map((item) => (
                <div key={item.id} className="menu-card">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                </div>
              ))
            ) : (
              <p>No menu items available. Add some products!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
