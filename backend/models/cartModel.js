const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            ref: "BookUpload",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
