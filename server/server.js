require('dotenv').config({path:'./.env'})
const express = require('express')
const cors = require('cors')
const models = require('./models/models')
const sequelize = require('./db')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const headerMiddleware = require('./middleware/headerMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/', router)
app.use(errorHandler)




const start = async () => {
    try 
    {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started at ${PORT}`))
    }
    catch (e)
    {
        console.log(e)
    }
}

start()
