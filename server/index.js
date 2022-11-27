const express = require('express')
const app = express()
const env = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const authRouter = require('./src/routes/authRoutes')
const clientRouter = require('./src/routes/clientRoutes')
const reviewerRouter = require('./src/routes/reviewerRoutes')
// const { urlencoded } = require('express')
// const bodyParser = require('body-parser')
//We can change the header of the preflight request in the cors
app.use(cors())
env.config()
app.use(express.json())
// app.use(bodyParser.urlencoded())
// app.use(bodyParser.urlencoded({extended:true}))

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {})
        console.log('Connected with database')
    } catch (error) {
        console.log(error.message)
    }
}
connect()
const port = process.env.PORT || 3003

app.use('/', authRouter)
app.use('/client',clientRouter)
app.use('/reviewer', reviewerRouter)
app.get('/', (req, res) => {
    res.send("Welcome to IPR Management System API")
})
app.listen(port, () => {
    // console.log(process.env.AWS_ACCESS_KEY)
    console.log(`Listening to port ${port}`)
})

module.exports = app;