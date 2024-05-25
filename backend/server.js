const express = require('express');
const app = express();
const PORT = process.env.PORT || 5004;
const cors = require('cors');
const dotenv = require('dotenv');

require('./db/db');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes")

app.use(cors());
app.use(express.json());


app.use('/api/books', bookRoutes);
app.use('/api/userRoutes', userRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the server');
})

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})