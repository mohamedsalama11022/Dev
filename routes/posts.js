const express = require('express')
const router = express.Router() 
const PostModel = require('../models/posts')

router.get('/', (request, response, next)=> {  
    PostModel.find({}, (err, posts)=>{
        if(!err){
            response.json(posts)
        }
        next(err)
    })
})

router.get('/:id', (request, response, next)=> {      
    const routeParams = request.params
    console.log("the iddddddddddddd "+request.params.id)
    const id  = request.params.id
    const postById = PostModel.findById(id, (err,post) =>{
        if(!err){
            response.json(post)
        }
        next(err)
    })
})

router.post('/', (request, response, next) =>{  
    const { title, body } = request.body
    const postInstance = new PostModel({
        title,
        body,
    })
    postInstance.save( (err, postSavedInDB)=>{
        if(!err) return response.json(postSavedInDB)
        next(err)
    })
})

router.patch('/:id', (request, response) =>{
    const id  = request.params.id
    PostModel.findByIdAndUpdate(id, 
        {$set: request.body},
        {new: true}, 
        (err, newPost)=>{
        if(!err){
            response.json(newPost)
        }
    })
})



router.delete('/:id', (request, response)=>{
    const id  = request.params.id
    const removePostById = PostModel.remove( {_id: id}, (err) =>{
        if(!err){
            response.send("Post Deleted Successfully!")
        }
    })

})



module.exports = router

