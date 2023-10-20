const Gift = require("../models/Gift");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const getAllGifts = async (req, res) => {
  const gifts = await Gift.find({});
  res.status(StatusCodes.OK).json({ gifts, amount: gifts.length });
};
const CreateGift = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const gift = await Gift.create(req.body);
  res.status(StatusCodes.CREATED).json({ gift });
};

const getGift = async (req, res) => {
  const { id: giftID } = req.params;
  const gift = await Gift.findOne({ _id: giftID });
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
  res.status(StatusCodes.OK).json({ msg: `Deleted gift with id ${giftID}` });
};

const updateGift = async (req, res) => {
  const {
    body: { name, price, description, image, category },
    user: { userID },
    params: { id: giftID },
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

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file Uploaded");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please Upload Image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError("Please Upload Image smaller than 1MB");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};
const uploadGiftsImageToCloud = async (req, res) => {
  // console.log(req.files);

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "becky_gifts",
    }
  );
  // console.log(result);
  // After uploading files to server we want to remove tmp folder
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  getAllGifts,
  getGift,
  CreateGift,
  deleteGift,
  updateGift,
  uploadImage,
  uploadGiftsImageToCloud,
};
