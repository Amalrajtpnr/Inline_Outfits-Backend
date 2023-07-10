const router=require("express").Router()
const User = require("../models/user.js");
const apiKeyMiddleware = require("../middleware/apikey.js");


//update user
router.put("/", apiKeyMiddleware, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("You can update only your account");
    } else {
      try {
        const newUser = await User.findOneAndUpdate(req.body.username, {
          $set: {
            username: req.body.username,
            name: req.body.name,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
          },
        });
  
        res.status(200).json("Account has been updated");
      } catch (error) {
        return res.status(500).json(error);
      }
    }
});


//get user
router.get("/:id", apiKeyMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  //update personal information
  router.post("/:id", apiKeyMiddleware,async(req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      
    } catch (error) {
      
    }
  })

module.exports = router;
