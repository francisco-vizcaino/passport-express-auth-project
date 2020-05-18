//Brings in express and sets "express" and "app" variables
const express = require('express')
const app = express()

//Sets ejs as view engine
app.set('view-engine', 'ejs')

//Sets view route for our index page
app.get('/', (req, res) => {
    res.render('index.ejs')
});

//Sets view route for our login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
});

//Sets view route for our register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
});


//Runs app on port 3000
app.listen(3000)
console.log("Server running on port 3000...")