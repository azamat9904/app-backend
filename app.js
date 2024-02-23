require('dotenv').config()
const express = require('express');
const cors = require('cors')
const { sequelize } = require('./core/db')
const { config  } = require('./config/index')
const { router } = require('./routes/index')

const app = express();

app.use(
    cors({
        credentials: false,
    })
)

app.use(express.json())
app.use(router)
app.use((req, res) => {
    res.json({
        message: "Hello world"
    })
})

sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(async () => {
        console.log('Successfully connected to database')
        app.listen(config.PORT, () => {
            console.log('App is running on port ' + config.PORT)
        })
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error)
    })
