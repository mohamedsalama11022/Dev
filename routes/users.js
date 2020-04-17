const express = require('express')
const router = express.Router() 
const UserModel = require('../models/users')


// router.use((req, res, next) => {
//     console.log("user routers")
//     next()
// }) 


router.get('/', (request, response, next)=> {  //list all users
    UserModel.find({}, (err, users)=>{
        if(!err){
            response.json(users)
        }
        next(err)
    })
    // response.send('listing users')
})

router.get('/:id', (request, response, next)=> {      //return by id
    const routeParams = request.params
    // const { id, postId, xForTest } object distructure
    console.log("the iddddddddddddd "+request.params.id)
    const id  = request.params.id
    const userById = UserModel.findById(id, (err,user) =>{
        if(!err){
            response.json(user)
        }
        next(err)
    })
})

router.post('/', (request, response, next) =>{  //insert new user
    // debugger
    //i need the request body which available in request.body
    const { firstName, lastName, password, dob, gender, email, phoneNo } = request.body
    //construct user instance from userModel
    const userInstance = new UserModel({
        firstName,
        lastName,
        password,
        dob,
        gender,
        email,
        phoneNo,
    })
    //save user instance in DB
    userInstance.save( (err, userSavedInDB)=>{
        if(!err) return response.json(userSavedInDB)
        next(err)
    })
})

router.patch('/:id', (request, response) =>{
    const id  = request.params.id
    UserModel.findByIdAndUpdate({_id: id}, 
        {firstName, lastName, password, dob, gender, email, phoneNo} = request.body, 
        (err, newUser)=>{
        if(!err){
            response.json(newUser)
        }
    })
})



router.delete('/:id', (request, response)=>{
    const id  = request.params.id
    const removeUserById = UserModel.remove( {_id: id}, (err) =>{
        if(!err){
            response.send("User Deleted Successfully!")
        }
    })

})


module.exports = router