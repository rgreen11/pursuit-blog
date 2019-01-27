const express = require('express')
const commentUser = express.Router();
const readComment = require('../../service/public/comment');


// GET /comment/:comment_id
commentUser.get('/:comment_id', (req, res)=>{
    const {comment_id} = req.params;

    readComment.read(comment_id)
    .then((data)=>{
        res.json(data)
    })
    .catch(err =>{
        res.json(err.toString())
    })
})

module.exports = commentUser;