const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const apiKeyMiddleware = require("../middleware/apikey.js");


//Register
router.post("/", async (req, res) => {
  try {
    //   generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Check if all required fields are present in the request body
    if (!req.body.password || !req.body.email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findOne({
      $or: [{ email: req.body.email }, { password: req.body.password }],
    });

    if (user) {
      res.status(200).json("user already exists");
    } else {
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save();

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(200).json(error);
    console.log("first");
  }

  //   await newUser.save();
  //   res.send("ok");
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json("Wrong password");
    }

    // Password is valid, authentication successful
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});


//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted sucessfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account");
  }
});

module.exports = router;
