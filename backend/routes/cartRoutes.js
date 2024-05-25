const express = require('express');
const { addToCart, getCart, deleteItemInCart, updateQuantity, payment, clear, deleteCartItems } = require("../controllers/cartController");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addToCart);
router.route('/cart-items').get(protect, getCart).delete(protect, clear);
router.route('/:id').delete(protect, deleteItemInCart).put(protect, updateQuantity);
router.route('/payment').post(payment);

module.exports = router;