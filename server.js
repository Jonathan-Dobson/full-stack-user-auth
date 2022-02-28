require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongo-izjcm.gcp.mongodb.net/todos?retryWrites=true&w=majority`
const options = {
    useCreateIndex: false,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}
const callback = () => {
  console.log('connected to database')
}
console.log(url);
mongoose.connect(url, options, callback)

app.use('/todos', require('./routes/todoRoute'))

//Error Handling
app.use((err, req, res, next)=> {
    return res.send( {
        errorMessage: err.message
    })
})



app.listen(PORT,()=>console.log(`listening on port ${PORT}`))