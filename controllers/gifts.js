const Gift = require("../models/Gift");

const getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find({});
    res.status(200).json({ gifts, amount: gifts.length });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const CreateGift = async (req, res) => {
  try {
    const gift = await Gift.create(req.body);
    res.status(201).json({ gift });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const getGift = async (req, res) => {
  try {
    const { id: giftID } = req.params;
    const gift = await Gift.findOne({ _id: giftID });
    if (!gift) {
      return res.status(404).json({ msg: `No gift with id ${giftID}` });
    }
    res.status(200).json({ gift });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const deleteGift = async (req, res) => {
  try {
    const { id: giftID } = req.params;
    const gift = await Gift.findOneAndDelete({ _id: giftID });
    if (!gift) {
      return res.status(404).json({ msg: `No task with id ${giftID}` });
    }
    res.status(200).json({ msg: `Deleted task with id ${giftID}` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const updateGift = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getAllGifts, getGift, CreateGift, deleteGift, updateGift };
