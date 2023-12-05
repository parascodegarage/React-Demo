const { User } = require("../model/User");
const { hashPassword, comparePassword } = require("../specialFunction/bcrypt");
const { generateToken } = require("../specialFunction/token");
const { validationResult } = require("express-validator");

addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with same email already exists", existingUser });
    }
    const newUser = new User({
      userName: userName,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

userLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);

    res.json({
      message: "user login",
      username: user.userName,
      email: req.body.email,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

userList = async (req, res) => {
  try {
    const Users = await User.find({});
    console.log("usersLists ", Users);
    if(!Users){
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "List of All Users", Users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userName, password, email } = req.body;

    const user = await User.findOne({ email });
    console.log("req.user", user);

    user.userName = userName;
    user.password = password;

    if (password) {
      user.password = await hashPassword(password);
    }

    await user.save();

    res.status(200).send("User data updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

deleteUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userDelete = await User.deleteOne({ email });
    console.log("userDelete..........", userDelete);
    if (!userDelete) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).send({ message: "User deleted successfully", userDelete });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addUser, userLogin, updateUser, deleteUser, userList };
