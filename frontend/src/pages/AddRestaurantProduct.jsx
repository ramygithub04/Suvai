import React, { useState } from 'react';
import './AddRestaurantProduct.css';

const AddRestaurantProduct = () => {
  const [type, setType] = useState('restaurant');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, location, price, image };

    if (type === 'restaurant') {
      console.log('New Restaurant Added:', newItem);
    } else {
      console.log('New Product Added:', newItem);
    }

    setName('');
    setLocation('');
    setPrice('');
    setImage('');
  };

  return (
    <div className="add-container">
      <h2>Add {type === 'restaurant' ? 'Restaurant' : 'Product'}</h2>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="restaurant">Restaurant</option>
        <option value="product">Product</option>
      </select>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        
        {type === 'restaurant' && (
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        )}

        {type === 'product' && (
          <input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        )}

        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit">Add {type}</button>
      </form>
    </div>
  );
};

export default AddRestaurantProduct;
