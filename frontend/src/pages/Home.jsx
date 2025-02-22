import React, { useState } from 'react';
import './Home.css';

const restaurants = [
  { id: 1, name: 'Spicy Treats', location: 'Chennai', image: 'restaurant1.jpg' },
  { id: 2, name: 'Royal Dine', location: 'Bangalore', image: 'restaurant2.jpg' },
  { id: 3, name: 'Tandoori Nights', location: 'Hyderabad', image: 'restaurant3.jpg' },
  { id: 4, name: 'Flavors Hub', location: 'Mumbai', image: 'restaurant4.jpg' },
  { id: 5, name: 'Delish Delights', location: 'Delhi', image: 'restaurant5.jpg' }
];

const Home = () => {
  const [index, setIndex] = useState(0);

  const prevRestaurant = () => {
    if (index > 0) setIndex(index - 1);
  };

  const nextRestaurant = () => {
    if (index < restaurants.length - 3) setIndex(index + 1);
  };

  return (
    <div className="home-container">
      

      {/* Hero Section */}
      <div className="hero-section">
        <div className="quote">"Good food is the foundation of genuine happiness."</div>
      </div>

      {/* Explore Section */}
      <div className="Explore">
        Explore the variety of restaurants
      </div>

      {/* Restaurant Section */}
      <div className="restaurant-section">
        {/* Left Button */}
        <button className="left-btn" onClick={prevRestaurant} disabled={index === 0}>&lt;</button>
        
        {/* Restaurant List */}
        <div className="restaurant-list">
          {restaurants.slice(index, index + 3).map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <img src={restaurant.image} alt={restaurant.name} />
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button className="right-btn" onClick={nextRestaurant} disabled={index === restaurants.length - 3}>&gt;</button>
      </div>
    </div>
  );
};

export default Home;
