const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const User = require("./models/User"); // ✅ User Model
const Order = require("./models/Order"); // ✅ Using Your Existing Order Model

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://demomongo123:demomongo123@cluster0.8mt8r.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

/**
 * ✅ REGISTER ROUTE
 */
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role, restaurantName, location } = req.body;

        const newUser = new User({ username, email, password, role, restaurantName, location });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Server error. Try again later." });
    }
});

/**
 * ✅ LOGIN ROUTE
 */
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not registered" });

        console.log(`Login Attempt for: ${email}`);
        console.log(`Stored Hashed Password: ${user.password}`);
        console.log(`Entered Password: ${password}`);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password Match Status: ${isMatch}`);

        if (!isMatch) return res.status(401).json({ error: "Invalid Password" });

        res.status(200).json({ message: "Login successful", username: user.username });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Server error. Try again later." });
    }
});

/**
 * ✅ PLACE AN ORDER (Uses Existing Order Model)
 */
app.post("/api/orders", async (req, res) => {
    try {
        const { user, items, total } = req.body;

        const newOrder = new Order({ user, items, total });
        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ message: "Failed to place order", error });
    }
});

/**
 * ✅ GET ALL ORDERS
 */
app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error("Fetching Orders Error:", error);
        res.status(500).json({ message: "Error fetching orders", error });
    }
});

/**
 * ✅ GET ORDERS FOR A SPECIFIC USER
 */
app.get("/api/orders/:user", async (req, res) => {
    try {
        const { user } = req.params;
        const userOrders = await Order.find({ user });

        res.json(userOrders);
    } catch (error) {
        console.error("Fetching User Orders Error:", error);
        res.status(500).json({ message: "Error fetching user orders", error });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
