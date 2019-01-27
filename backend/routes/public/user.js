const express = require('express');
const userRouter = express.Router();
const userService = require('../../service/public/user')
const bcrypt = require('bcrypt');
const uuidv1 = require('uuid/v1');

// console.log(userService)

/*
C - CREATE
R - READ
U - UPDATE
D - DELETE
*/

// POST /user
userRouter.post('/', (req, res) => {

    const {username,email,password} = req.body;

    bcrypt.hash(password, 10)
        .then((encryptedPassword) => {
            const newUser = {
                username: username,
                email: email,
                password: encryptedPassword,
                // updatedAt: new Date()
            }
            userService.create(newUser.username, newUser.email, newUser.password)
                .then(() => {
                    res.json(`username has been created`)
                }).catch(err => {
                    console.log('err', err)
                })
              
        }).catch(err => {
            res.json(err.toString())
        })

})

// GET /user/:user_id
userRouter.get('/:id', (req, res)=>{
 
    const {id} = req.params 

    userService.read(id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err.toString())
    })

})

// GET /user/:user_id/posts
userRouter.get('/:user_id/posts', (req,res)=>{

    const {user_id} = req.params

    userService.postBody(user_id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err.toString())
    })

})


// GET /user/:user_id/posts/:post_id
userRouter.get('/:user_id/posts/:post_id', (req, res)=>{
    const {user_id} = req.params;
    const {post_id} = req.params;
    userService.postId(user_id, post_id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err.toString())
    })
})

// GET /user/:user_id/comments
userRouter.get('/:user_id/comments',(req, res)=>{
    const {user_id} = req.params;
    userService.postComment(user_id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err.toString())
    })
})

// GET /user/:user_id/comments/:comment_id
userRouter.get('/:user_id/comments/:comment_id', (req, res)=>{
    const {user_id} = req.params;
    const {comment_id} = req.params;
    userService.commentId(user_id, comment_id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err=>{
        res.json(err.toString())
    })
})

// POST /user/login
userRouter.post('/user/login', (req, res)=>{
    const {id,username,password} = req.body
    userService.read(id)
    .then(response=>{
        if(response.username === username){
           return bcrypt.compare(password,response.password)
            
        }
    })
    .then(boolean=>{
        if(boolean === true){
            res.json('you are login')
        } //password correct
    })
})

// userRouter.delete('/', (req, res)=>{

// })

module.exports = userRouter;


