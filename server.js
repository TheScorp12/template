const express = require('express')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const cors= require('cors')
const swagger = require('swagger-ui-express')
const swaggerDocument = require('./swagger/api.json')

const app = express()
app.use("/api", swagger.serve, swagger.setup(swaggerDocument));

app.use(cors())
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(morgan('combined', { stream: accessLogStream }))



app.use(routes)


mongoose.connect('mongodb+srv://aasimm20:VekGfvCfncxV80AR@cluster0.c7o7khs.mongodb.net/test')
.then(result => {
    console.log('Connected to Database')
    app.listen(5000)
}).catch(err => {
    console.log(err)
})