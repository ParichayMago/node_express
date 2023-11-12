const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// SIGNING UP OF A USER
// /api/users/register
// @PUBLIC, @POST
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvalable = await userModel.findOne({ email });

  if (userAvalable) {
    // res.status(400).json({message: "User already exist"});
    throw new Error("User already exist");
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Hashed password successfully generated", hashedPassword);
  const user = await userModel.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  console.log(`new User registered ${name}`);
  if (user) {
    res.status(201).json({ _id: user.id, email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "New user is created" });
});

// LOGGING IN OF USER
// /api/users/login
// @PUBLIC, @POST
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter Email and Password");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("This email is not registered");
  }
  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({
      user: {
        username: user.name,
        email: user.email,
        id: user.id,
      },
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1000m'});
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Password is incorrect");
  }

  res.json({ message: `Logged in as user ` });
});

// CURRENT USER INFO
// /api/users/current
// @PRIVATE, @GET
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
