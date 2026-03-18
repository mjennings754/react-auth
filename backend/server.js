const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));
app.use(express.json())

app.use("/api/auth", require("./routes/auth"));

app.get("/api/protected", auth, (req, res) => {
    res.json({message: "Protected data", user: req.user});
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.log(error));

app.listen(5000, () => console.log("Server running on port 5000"));