//Loads our env if we are in development 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Includes all of our dependencies
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./config/passport-config.js')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

//Stores users
const users = []

//Sets ejs as view engine
app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

//Set up secret key located in the .env file
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//Sets view route for our index page
app.get('/', (req, res) => {
    res.render('index.ejs', { name: req.user.name })
});

//Sets view route for our login page
app.get('/login', (req, res) => {
    res.render('login.ejs')
});

//Sets view route for our register page
app.get('/register', (req, res) => {
    res.render('register.ejs')
});


//Handles register
app.post('/register', async(req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

//Handles Login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))



//Runs app on port 3000
app.listen(3000)
console.log("Server running on port 3000...")