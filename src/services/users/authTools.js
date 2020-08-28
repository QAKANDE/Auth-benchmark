const jwt = require("jsonwebtoken") ;
const User = require("./schema");

const authenticate = async (user) => {
  try {
    // generate tokens
    const newAccessToken = await generateJWT({ _id: user._id }) ;
    await user.save() ;
    return { token: newAccessToken } ;
  } catch (error) {
    console.log(error) ;
    throw new Error(error) ;
  }
} ;

const generateJWT = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "5m" },
      (err, token) => {
        if (err) rej(err) ;
        res(token) ;
      }
    )
  ) ;

const verifyJWT = (token) =>
  new Promise((res, rej) =>
    jwt.verify(token,  process.env.SECRET_KEY, (err, decoded) => {
      if (err) rej(err) ;
      res(decoded) ;
    })
  ) ;

module.exports = { authenticate, verifyJWT};