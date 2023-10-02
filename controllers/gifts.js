const Gift = require("../models/Gift");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllGifts = async (req, res) => {
  const gifts = await Gift.find({ createdBy: req.user.userID });
  res.status(StatusCodes.OK).json({ gifts, amount: gifts.length });
};
const CreateGift = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const gift = await Gift.create(req.body);
  res.status(StatusCodes.CREATED).json({ gift });
};
const getGift = async (req, res) => {
  const { id: giftID } = req.params;
  const { userID } = req.user;
  const gift = await Gift.findOne({ _id: giftID, createdBy: userID });
  if (!gift) {
    throw new NotFoundError(`No gift with id ${giftID}`);
  }
  res.status(StatusCodes.OK).json({ gift });
};
const deleteGift = async (req, res) => {
  const { id: giftID } = req.params;
  const { userID } = req.user;
  const gift = await Gift.findByIdAndRemove({ _id: giftID, createdBy: userID });
  if (!gift) {
    throw new NotFoundError(`No gift with id ${giftID}`);
  }
  res.status(StatusCodes.OK).json({ msg: `Deleted task with id ${giftID}` });
};

const updateGift = async (req, res) => {
  const {
    body: { name, price, description, image, category },
    user: { userID },
    params: { id:giftID },
  } = req;
  if (!name || !price || !description || !image || !category) {
    throw new BadRequestError(`Provide all fields`);
  }
  const gift = await Gift.findOneAndUpdate(
    { _id: giftID, createdBy: userID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!gift) {
    throw new NotFoundError(`No gift with id ${giftID}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ gift, msg: `Gift with id ${giftID} has been updated` });
};

module.exports = { getAllGifts, getGift, CreateGift, deleteGift, updateGift };
