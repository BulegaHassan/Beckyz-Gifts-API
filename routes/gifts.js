const express = require('express')
const router = express.Router()

const { getAllGifts, getGift, CreateGift, deleteGift, updateGift } = require('../controllers/gifts')

router.route('/').get(getAllGifts).post(CreateGift)
router.route('/:id').get(getGift).patch(updateGift).delete(deleteGift)

module.exports = router