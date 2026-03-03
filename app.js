const express = require('express');
const app = express();
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Routes
const recipeRoutes = require('./routes/recipes');
const homeRoutes = require('./routes/home');

app.use('/', homeRoutes);
app.use('/recipes', recipeRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});