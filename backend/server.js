const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/User"); // Adjust path as needed

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Replace with your connection string)
mongoose.connect("mongodb+srv://demomongo123:demomongo123@cluster0.8mt8r.mongodb.net/backend?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

/**
 * ✅ REGISTER ROUTE
 * - Ensures password is hashed before storing
 * - Prevents duplicate hashing
 */
app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role, restaurantName, location } = req.body;

        // ✅ Don't hash manually, Mongoose will do it
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
 * - Checks hashed password correctly
 * - Logs password comparison for debugging
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


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
