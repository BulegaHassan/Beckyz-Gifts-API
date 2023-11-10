const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError(
      "It seems you already have an account, consider logging in"
    );
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT(); 
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        name: user.name,
        userID: user.id,
        email: user.email,
        role: user.role,
      },
      token,
    });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      userID: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  });
};
const getAdmins = async (req, res) => {
  const admins = await User.find({});
  res.status(StatusCodes.OK).json({ admins, number: admins.length });
};
const deleteUsers = async (req, res) => {
  const users = await User.deleteMany({});
  res.status(StatusCodes.OK).json({ msg: `Users deleted` });
};
module.exports = { register, login, deleteUsers, getAdmins };
