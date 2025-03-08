const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "customer"], required: true },
    restaurantName: { type: String },
    location: { type: String }
});

module.exports = mongoose.model("User", UserSchema);
