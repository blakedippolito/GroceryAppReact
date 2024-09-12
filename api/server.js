const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
// const homeRoutes = require('./routes/home')
const listRoutes = require('./routes/list')
const iconRoutes = require('./routes/icons')
const cors = require('cors');



require('dotenv').config({path: './config/.env'})

// Passport config
// require('./config/passport')(passport)

connectDB()
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Sessions
// app.use(
//     session({
//       secret: 'keyboard cat',
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ mongoUrl: process.env.DB_STRING }),
//     })
//   )
  
// Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

app.use(flash())

// app.use('/', homeRoutes)
app.use('/api/list', listRoutes)
app.use('/api/icons', iconRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})