const Gift = require('../models/Gift')

const getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find({})
    res.status(200).json({gifts, amount:gifts.length})
  } catch (error) {
    res.status(500).json({ msg: error });    
  }
};
const CreateGift = async (req, res) => {
try {
    const gift = await Gift.create(req.body)
    res.status(201).json({gift})
  } catch (error) {
    res.status(500).json({msg: error})
  }
};
const getGift = (req, res) => {
  res.send("get a single gift");
};
const deleteGift = (req, res) => {
  res.send("delete a gift");
};
const updateGift = (req, res) => {
  res.send("update a gift");
};

module.exports = { getAllGifts, getGift, CreateGift, deleteGift, updateGift };
