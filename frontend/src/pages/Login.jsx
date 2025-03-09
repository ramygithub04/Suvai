import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
      
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Invalid login credentials");
          }
      
          const data = await response.json();
          
          alert("Login successful!");
      
          localStorage.setItem("user", JSON.stringify(data));
          localStorage.setItem("role", data.role);
      
          // ✅ Notify Navbar to update role state
          window.dispatchEvent(new Event("storage"));
      
          navigate("/");
      
        } catch (err) {
          console.error("Login error:", err.message);
          setError(err.message);
        }
      };
      
  

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;