const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const mongoose = require('mongoose')

const stripe = require('stripe')('sk_test_51P3u9uSIchOEaNpVCzGpZaNuGUMN3QKG1KcyynuxeH1wNj9A8XzjgFHHPd7nMiZom0f5TTyL85mhr1Z1LoivMNqy00DOZos1Ot')

const getCart = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
    }
    console.log(req.user);
    const cartItem = await Cart.find({ user: req.user._id }).populate('productId');
    res.json(cartItem);
});

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    console.log(req.user);

    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
    }

    if (!productId) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    // Check if the product is already in the cart for the user
    const existingCartItem = await Cart.findOne({ user: req.user._id, productId });

    if (existingCartItem) {
        res.status(420).json({ message: "Product already in cart" });
    } else {
        // Create a new cart item
        const cartItem = new Cart({ user: req.user._id, productId, quantity });
        const createdCartItem = await cartItem.save();
        res.status(201).json(createdCartItem);
    }
});

const deleteItemInCart = asyncHandler(async (req, res) => {
    const cartItemId = req.params.id;
    try {
        const existingItem = await Cart.findById(cartItemId);
        if (!existingItem) {
            res.status(404);
            throw new Error("Item not found");
        }
        if (existingItem._id.toString() !== cartItemId) {
            res.status(401);
            throw new Error("Item ID does not match");
        }
        await existingItem.deleteOne();
        res.send("Item deleted");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const clear = asyncHandler(async (req, res) => {
    console.log("from clearCart", req.user);
    try {
        console.log("User in clearCart controller:", req.user);

        if (!req.user) {
            res.status(401).json({ message: "Not authorized, user not found" });
            return;
        }

        await Cart.deleteMany({ user: req.user._id });
        console.log("Cart cleared for user:", req.user._id);
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: error.message });
    }
});

const deleteCartItems = asyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not authorized, user not found" });
            return;
        }
        const cartItem = await Cart.find({ user: req.user._id }).populate('productId');
        res.json(cartItem);
    } catch (error) {
        console.log(error);
    }
})



const updateQuantity = asyncHandler(async (req, res) => {
    const cartItem = await Cart.findById(req.params.id);
    if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
    }
    try {
        if (cartItem) {
            cartItem.quantity = req.body.quantity;
            const updatedCartItem = await cartItem.save();
            res.json(updatedCartItem);
        }
    } catch (error) {
        res.status(404);
        throw new Error('Cart item not found');
    }

})

const payment = asyncHandler(async (req, res) => {
    const { items, subTotal } = req.body;
    console.log(subTotal)
    console.log(items)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name
                        },
                        unit_amount: subTotal,
                    },
                    quantity: item.quantity,

                }
            }),
            success_url: "http://localhost:3000/thanks",
            cancel_url: "http://localhost:3000/cart"
        });
        res.json({ url: session.url });
        console.log(quantity)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getCart, addToCart, deleteItemInCart, clear, updateQuantity, payment, deleteCartItems };
