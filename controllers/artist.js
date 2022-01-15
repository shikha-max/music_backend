const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Album=require("../models/album")






//---------------geting perticular artist with its album------------------------------//

router.get("/:artist/album", async (req, res) => {
    try {
      let user = await User.findById(req.params.artist );
  
      if (!user)return res.status(404).send({ err: "no" });
  
     let album= await Album.find({artist:user._id}).lean().exec()
     return res.status(200).send({data:user,album:album})
    } catch (error) {
      return res.status(404).send({ err: error });
    }
  });



  module.exports =router