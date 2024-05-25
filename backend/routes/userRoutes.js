const express = require('express');
const { uploadUser, getUser } = require("../controllers/userController");
const router = express.Router();

router.route('/').post(uploadUser);
router.route('/all-users').post(getUser);


module.exports = router;