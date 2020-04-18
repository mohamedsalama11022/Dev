const express = require('express')
const router = express.Router() 
const PostModel = require('../models/posts')


/* List all Posts */
router.get('/', async(request, response, next)=> {  

try{
    const allPosts = await PostModel.find({}).populate('author').exec()
    response.json(allPosts)
}catch(err){
    next("connection faild")
    }

})


/* List Post By Id */
router.get('/:id', async(request, response, next)=> {      
    const routeParams = request.params
    const id  = request.params.id
    try{
        const postById =await PostModel.findById(id).populate('author').exec()
        response.json(postById)
    }
   catch(err){
    next("connection faild")
   }

})


/* Insert New Post */
router.post('/', async(request, response, next) =>{  
    const { title, body, author } = request.body
    const postInstance = new PostModel({
        title,
        body,
        author
    })
    try{
        const newPost = await postInstance.save()
        response.json(newPost)
    }catch(err){
        next("error saving the post")
    }

})


/* Update Post */
router.patch('/:id', async(request, responsem, next) =>{
    const id  = request.params.id
    try{
        const updatedPost = await PostModel.findByIdAndUpdate(id, {$set: request.body},{new: true})
        responsem.json(updatedPost)
    }catch(err){
        next("error updating the post")
    }
    

})


/* Delete Post */
router.delete('/:id', (request, response)=>{
    const id  = request.params.id
    const removePostById = PostModel.remove( {_id: id}, (err) =>{
        if(!err){
            response.send("Post Deleted Successfully!")
        }
    })

})



module.exports = router

