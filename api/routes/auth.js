const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log(req.body , 'req.body')
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    console.log(user , 'user')

    !user && res.status(401).json("Wrong User Name");



    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    );



// hashedPassword => { words: [ 825373492, 892733962, 168430090, 168430090 ], sigBytes: 6 } 

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    //123456 => originalPassword come from database

    const inputPassword = req.body.password;
    // 123456 inputPassword come from body



    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
//accessToken => eyJhbGciOiJIUzI1NiIsInR5cCmY...............

    const { password, ...others } = user._doc;

    // user._doc =>  {
  // _id: new ObjectId("633aa06c8eda7bf84e3864fc"),
  // username: 'ahmed',
  // email: 'ahmed@gmail.com',
  // password: 'U2FsdGVkX18mP+RKwHYBMmSZSw/q4UYIwqfHWI4eCFE=',
  // isAdmin: false,
  // createdAt: 2022-10-03T08:42:20.512Z,
  // updatedAt: 2022-10-03T08:42:20.512Z,
  // __v: 0
// } 

    

    res.status(200).json({ ...others, accessToken });

        // { ...others, accessToken } =>  {
  // _id: new ObjectId("633aa06c8eda7bf84e3864fc"),
  // username: 'ahmed',
  // email: 'ahmed@gmail.com',
  // isAdmin: false,
  // createdAt: 2022-10-03T08:42:20.512Z,
  // updatedAt: 2022-10-03T08:42:20.512Z,
  // __v: 0
// } 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
