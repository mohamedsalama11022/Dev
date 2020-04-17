const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const log = require('./middlewares/log')
const logRequest = require('./middlewares/logRequest')
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/blog-db', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },
    (err) => {
        if(!err) return console.log("Connection Done!")
        console.log(err)
})

app.use(express.static('public'))
// app.use(log)
app.use('/users', userRouter)
app.use('/posts', postRouter)

// app.use(logRequest)


app.listen(5000, (err) => {
    if(!err) return console.log(`server started on port ${PORT}`)
    console.log(err)
})

