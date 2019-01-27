const express = require('express');
const servicePost = express.Router();
const readPost = require('../../service/public/post');

// GET /post/:post_id
servicePost.get('/:post_id', (req, res) => {

    const {post_id} = req.params;
    readPost.read(post_id)
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.json(err.toString())
        })

})

// GET /post/:post_id/comments
servicePost.get('/:post_id/comments', (req, res) => {

    const {post_id} = req.params;
    

    readPost.postComment(post_id)
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            res.json(err.toString())
        })

})

// GET /post/:post_id/comments/:comment_id
servicePost.get('/:post_id/comments/:comment_id', (req, res) => {
   
    const {post_id, comment_id} = req.params;

    readPost.postCommentId(post_id, comment_id)
        .then((data1) => {
            res.json(data1)
        })
        .catch(err => {
            res.json(err.toString())
        })

})

module.exports = servicePost;