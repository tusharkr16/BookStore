const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    console.log(id);
    console.log('jwt token', process.env.JWT_SECRET)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = generateToken;