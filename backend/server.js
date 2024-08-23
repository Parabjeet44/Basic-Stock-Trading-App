const express = require('express');
const cors = require('cors');
const stockRouter = require('./routes/stocks'); // Ensure this path is correct

require('dotenv').config();

const app = express();
app.use(cors());
app.use('/api/stock', stockRouter); // Make sure this is correctly configured

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
