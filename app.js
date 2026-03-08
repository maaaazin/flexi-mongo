const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/usersDB")
    .then(() => console.log("Database connected Successfully"))
    .catch((err) => {
        console.log("Could not connect to database", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Hello CRUD Project for SIT" });
});

const UserRoute = require("./routes/routes");
app.use("/user", UserRoute);

app.listen(3000, () => {
    console.log("Server is starting on port: 3000");
});
