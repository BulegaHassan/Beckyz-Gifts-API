const getAllGifts = (req, res) => {
  res.send("get all gifts");
};
const CreateGift = (req, res) => {
  res.send(req.body);
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
