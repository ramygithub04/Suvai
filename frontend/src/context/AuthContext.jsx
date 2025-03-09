import React, { createContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role") || "");
    };

    // Listen for changes in localStorage (even in other tabs)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (newRole) => {
    localStorage.setItem("role", newRole);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem("role");
    setRole("");
  };

  // ✅ Restaurant Management (Added Without Modifying Login)
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Foodie Hub", location: "New York", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Spicy Delights", location: "Los Angeles", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Taste Buds", location: "Chicago", image: "https://via.placeholder.com/150" },
  ]);

  const [adminMenu, setAdminMenu] = useState([]);

  const addRestaurant = (newRestaurant) => {
    const id = restaurants.length + 1;
    setRestaurants([...restaurants, { id, ...newRestaurant }]);
  };

  const addProduct = (restaurantId, newProduct) => {
    const id = adminMenu.length + 1;
    setAdminMenu([...adminMenu, { id, restaurantId, ...newProduct }]);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        login,
        logout,
        restaurants,
        addRestaurant,
        adminMenu,
        addProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
