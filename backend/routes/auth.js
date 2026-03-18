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

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email});
        if (!user) return res.status(400).json({message: "Email or password is incorrect"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Email or password is incorrect"});

        const token = jwt.sign(
            {id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.json({ token, user: { id: user._id, username: user.username}});
    } catch (error) {
        res.status(500).send("Server error");
    }
})

module.exports = router;