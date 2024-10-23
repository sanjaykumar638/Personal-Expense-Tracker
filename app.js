const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const { setupDatabase } = require('./DB/database');

// Initialize the Express app
const app = express();
app.use(bodyParser.json());

// Setup database
setupDatabase();

// Routes
app.use('/transactions', transactionRoutes);
app.use('/summary', summaryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

