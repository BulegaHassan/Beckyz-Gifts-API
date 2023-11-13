const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllGifts,
  getGift,
  CreateGift,
  deleteGift,
  updateGift,
  uploadImage,
  uploadGiftsImageToCloud,
  deleteAllGifts,
} = require("../controllers/giftsController");

router
  .route("/")
  .get(getAllGifts)
  .post(authenticateUser, CreateGift)
  .delete(authenticateUser, deleteAllGifts);
router.route("/uploadImage").post(uploadImage);
router
  .route("/uploadImageCloud")
  .post(authenticateUser, uploadGiftsImageToCloud);
router
  .route("/:id")
  .get(getGift)
  .patch(authenticateUser, updateGift)
  .delete(authenticateUser, deleteGift);

module.exports = router;
