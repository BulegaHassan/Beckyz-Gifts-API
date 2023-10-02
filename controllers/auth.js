const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");


const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user:{name: user.name},token });
};
const login = async (req, res) => {
  // res.status(StatusCodes.CREATED).json(req.body);
};

const deleteUsers = async (req,res) => {
  const users = await User.deleteMany({})
  res.status(StatusCodes.OK).json({msg: `Users deleted`})
}

module.exports = { register, login,deleteUsers };
