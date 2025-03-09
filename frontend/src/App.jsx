import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Cart from "./pages/Cart";
// import AddRestaurant from "./pages/AddRestaurant";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />  {/* ✅ Navbar is now inside AuthProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/cart" element={<Cart />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
