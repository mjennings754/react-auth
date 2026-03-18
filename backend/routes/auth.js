const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({message: "User has been registered"});
    } catch (err) {
        res.status(500).send("Server error");
    }
});
