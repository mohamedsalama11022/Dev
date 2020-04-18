const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000
const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')
const log = require('./middlewares/log')
const logRequest = require('./middlewares/logRequest')
const TokenGenerator = require('uuid-token-generator')
const UserModel = require('./models/users')


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

const tokgen = new TokenGenerator()
tokgen.generate()

app.use(async(req, res, next) => {
    const token = req.get("Authorization")
    try{
        const tokenInstance = await UserModel.findOne({tokgen: token})
        if(tokenInstance){
            const user = await UserModel.findOne({tokgen: token})
            req.user = user
            return next()
    }next("invalid credential")
}catch(err){
    next("invalid credential")
    }

})
app.use('/users', userRouter)
app.use('/posts', postRouter)

// app.use(logRequest)


app.listen(5000, (err) => {
    if(!err) return console.log(`server started on port ${PORT}`)
    console.log(err)
})

