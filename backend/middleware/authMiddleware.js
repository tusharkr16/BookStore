require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Received token:", token);
            console.log("env", process.env.JWT_SECRET)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);
            req.user = await User.findById(decoded.id).select('-password');
            console.log("User:", req.user);
            next();
        } catch (err) {
            console.error("Error verifying token:", err);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }

    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorised, no token");
    }
})

module.exports = { protect };