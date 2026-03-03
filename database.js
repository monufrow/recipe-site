const express = require('express');
const mysql = require('mysql2');
const app = express();
var database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8zGLEpBR',
    database: 'recipesDB'
});
database.connect((err => {
    if (err) throw err;
    console.log('MySQL Connected');
}));

module.exports = database;