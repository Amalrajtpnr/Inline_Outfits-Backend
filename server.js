const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db.js");
const authRoutes=require("./routes/auth.js")
const userRoutes=require("./routes/user.js")


// const helmet = require("helmet");
const cors = require("cors");
const app = express();


const port = process.env.PORT || 5000;

//middlewares

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);



//routes

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});

connectDB();

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
