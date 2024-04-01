const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

require('./db/db');
const bookRoutes = require('./routes/bookRoutes')

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Hello from the server');
})

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})