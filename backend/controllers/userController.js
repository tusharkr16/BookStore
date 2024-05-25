const asyncHandler = require('express-async-handler');
const UserUpload = require("../models/userModel");
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken')

const uploadUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, photoUrl, password, confirmPassword } = req.body;
        const userExist = await UserUpload.findOne({ email });
        console.log(userExist);
        if (userExist) {
            res.status(400)
            throw new Error("User Already Exist");
        }
        if (!name || !email || !photoUrl || !password || !confirmPassword) {
            res.status(400)
            throw new Error("Please Fill all the fields");
        } else {
            const data = new UserUpload({ name, email, photoUrl, password, confirmPassword });
            const createdUpload = await data.save();
            if (createdUpload) {
                res.status(201).json({
                    _id: createdUpload._id,
                    name: createdUpload.name,
                    email: createdUpload.email,
                    pic: createdUpload.pic,
                    token: generateToken(createdUpload._id)
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

const getUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserUpload.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            console.log(user.password);
            if (!isMatch) {
                res.status(412).json({ error: "Invalid credentials" });
            }
            else {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id)
                });
            }
        } else {
            res.status(412).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
    }
})


module.exports = { uploadUser, getUser }

