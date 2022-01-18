const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Album=require("../models/album")
const { body, validationResult } = require("express-validator");


//-----------------signup----------------------------------------//

  
router.post(
  "/",
  body("name")
    .not()
    .isEmpty()
    .withMessage("should not be empty")
    .isLength({ min: 3 }),
  body("email").isEmail().withMessage("enter valid mail"),
  async (req, res) => {
    const error = validationResult(req);

    let user;
    try {
      if (!error.isEmpty()) return res.status(400).send({ err: error });

      user = await User.findOne({ email: req.body.email });

      if (user) return res.status(400).send({ err: "user already present" });

      let response = await User.create(req.body);

      return res.status(201).send({ user: response });
    } catch (error) {
      return res.status(400).send({ err: error});
    }
  }
);



//--------------------------login-----------------------------------//

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)return res.status(404).send({ err: "user not find please sign up" });

    if (user.password == req.body.password)return res.status(200).send({msg: "successfull login",data:user });
  } catch (error) {
    return res.status(404).send({ err: error });
  }
});


//--------------------------getting all user------------------------------//


router.get("/",async(req, res)=>{
    try {
        
        let response= await User.find({})

        return res.status(200).send({data:response})
    } catch (error) {
        return res.status(400).send({err:error})
    }
})

module.exports = router;
