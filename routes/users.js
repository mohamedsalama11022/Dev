const express = require('express')
const router = express.Router() 
const UserModel = require('../models/users')
const PostModel = require('../models/posts')

//list all users
router.get('/', async(request, response)=> {  
    try{
        const allUsers =await UserModel.find({})
        response.json(allUsers)
    }catch(err){
        next("connection faild")
    }

})

/* return by id */
router.get('/:id',async (request, response, next)=> {      
    const routeParams = request.params
    // const { id, postId, xForTest } object distructure
    const id  = request.params.id
    try{
    const userById = await UserModel.findById(id)
    response.json(userById)
    }catch(error){
        next("user not found")
    }
})


//insert new user
router.post('/',async (request, response, next) =>{  
    const { firstName, lastName, password, dob, gender, email, phoneNo, tokgen } = request.body
    //construct user instance from userModel
    const userInstance = new UserModel({
        firstName,
        lastName,
        password,
        dob,
        gender,
        email,
        phoneNo,
        tokgen,
    })
    //save user instance in DB
    try{
        const newUser = await userInstance.save()
        console.log(newUser.tokgen)
        response.send(newUser)
    }catch(err){
        next("Error saving in DB")
    }

})

//update use data
router.patch('/:id',async (request, response) =>{
  
    const id  = request.params.id
    try{
        const foundUser =await UserModel.findById(id)
        if(!foundUser){
            response.send("User Not Found")
        }else{
            if(request.body.firstName){foundUser.firstName = request.body.firstName}
            if(request.body.lastName){foundUser.lastName = request.body.lastName}
            if(request.body.password){foundUser.password = request.body.password}
            if(request.body.email){foundUser.email = request.body.email}
            if(request.body.gender){foundUser.gender = request.body.gender}
            if(request.body.dob){foundUser.dob = request.body.dob}
            if(request.body.phoneNo){foundUser.phoneNo = request.body.phoneNo}
            const saveUser = await foundUser.save()
            response.json(saveUser)

        }     
    }catch(error){
        next("not found")
    }
   
})


router.delete('/:id', async(request, response, next)=>{
    const id  = request.params.id
    try {
        const user = await UserModel.findById(id)
        const removeUserById =await UserModel.remove({_id: id})
        response.send("User Deleted!")
    }
    catch(err){
        next("user is not exists")
    }

})


/*   Find specific user posts   */ 
router.get('/:id/posts', async(request, response, next)=> {
    const id = request.params.id
    try{
        const userPosts = await PostModel.find({author: id})
        response.json(userPosts)
    }catch{
        next("user not found")
    }
})

module.exports = router
