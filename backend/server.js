const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to SUVAI");
});

// Register route
app.post('/register', async (req, res) => {
    const { username, email, password, role, restaurantName, location } = req.body;
    
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare user data
        const userData = { username, email, password: hashedPassword, role };
        
        // If the user is an admin, add restaurant details
        if (role === "admin") {
            if (!restaurantName || !location) {
                return res.status(400).json({ message: "Restaurant name and location are required for Admins." });
            }
            userData.restaurantName = restaurantName;
            userData.location = location;
        }

        // Save the user to the database
        const newUser = new User(userData);
        await newUser.save();

        res.status(201).json({ message: "User Registered Successfully." });
    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.json({
            message: "Login Successful",
            username: user.username,
            role: user.role,
            restaurantName: user.restaurantName || null,
            location: user.location || null
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Login failed. Please try again." });
    }
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://demomongo123:demomongo123@cluster0.8mt8r.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.error("Database connection error:", err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
