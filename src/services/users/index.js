const express = require("express") ;
const { authenticate, refreshToken } = require("./authTools");
const { authorize } = require("../middlewares/authorize");
const UserModel = require("./schema");
const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
      const newUser = new UserModel(req.body) ;
      const { _id } = await newUser.save() ;
  
      res.status(201).send(_id) ;
    } catch (error) {
      next(error) ;
    }
  }) ;

router.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body ;

      const user = await UserModel.findByCredentials(email, password) ;
      console.log(req.body);
      const tokens = await authenticate(user) ;
      res.send(tokens) ;
    } catch (error) {
   next(error) ;
    }
  }) ;

module.exports = router ;