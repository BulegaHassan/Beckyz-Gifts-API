const Gift = require("../models/Gift");

const getAllGifts = async (req, res) => {
  const gifts = await Gift.find({});
  res.status(200).json({ gifts, amount: gifts.length });
};
const CreateGift = async (req, res) => {
  const gift = await Gift.create(req.body);
  res.status(201).json({ gift });
};
const getGift = async (req, res) => {
  const { id: giftID } = req.params;
  const gift = await Gift.findOne({ _id: giftID });
  if (!gift) {
    return res.status(404).json({ msg: `No gift with id ${giftID}` });
  }
  res.status(200).json({ gift });
};
const deleteGift = async (req, res) => {
  const { id: giftID } = req.params;
  const gift = await Gift.findOneAndDelete({ _id: giftID });
  if (!gift) {
    return res.status(404).json({ msg: `No task with id ${giftID}` });
  }
  res.status(200).json({ msg: `Deleted task with id ${giftID}` });
};

const updateGift = async (req, res) => {
  const { id: giftID } = req.params;
  const gift = await Gift.findOneAndUpdate({ _id: giftID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!gift) {
    return res.status(404).json({ msg: `No gift with id ${giftID}` });
  }
  res
    .status(200)
    .json({ gift, msg: `Gift with id ${giftID} has been updated` });
};

module.exports = { getAllGifts, getGift, CreateGift, deleteGift, updateGift };
