const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError,NotFoundError } = require("../errors");
const {checkPermissions} = require('../utils')
const getAllUsers = async (req, res) => {
    // console.log(req.user);
    const users = await User.find({ role: 'user' }).select('-password');  // removing password also
    if (!users) {
        throw new BadRequestError('No User Found');
    }
    res.status(StatusCodes.OK).json({ users, No_of_users: users.length });
};
const getSingleUser = async (req, res) => {

    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
        throw new NotFoundError(`No user with id : ${req.params.id}`);
    }
    checkPermissions(req.user,user._id)
    res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
};
// Update user with user.save()
const updateUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new BadRequestError('Please provide both email and password');
    }
    const user = await User.findOne({ _id: req.user.userID });
    user.name = name;
    user.email = email;
    await user.save();

  const token = user.createJWT();
    
    res.status(StatusCodes.OK).json({ user: req.user,token });
};

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new BadRequestError('Please provide both passwords');
    }
    const user = await User.findOne({ _id: req.user.userID });

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Password Changed Successfully' });
};


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
};

// Update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//     const { name, email } = req.body;
//     if (!name || !email) {
//         throw new CustomError.BadRequestError('Please provide both email and password');
//     }
//     const user = await User.findOneAndUpdate(
//         { _id: req.user.userID },
//         { name, email },
//         { new: true, runValidators: true }
//     );

//     const tokenUser = createUserToken(user);
//     attachCookiesToResponse({ res, user: tokenUser });
//     res.status(StatusCodes.OK).json({ user: tokenUser });
// };