const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost/blog');
const postService = {};

// GET /post/:post_id
// GET /post/:post_id/comments
// GET /post/:post_id/comments/:comment_id



postService.read = (id) => {
    console.log('post')
    return db.one('SELECT * FROM posts WHERE id = ${id} ', {id})

}

postService.postComment = (id) => {
    console.log('keep it up')
    return db.any('SELECT comments.*, posts.* FROM posts JOIN comments ON comments.post_id = posts.id WHERE comments.post_id = ${id}', {id});
}

postService.postCommentId = (commentId, postId) => {
    console.log('made it here so far', postId)
    return db.one('SELECT posts.*, comments.* FROM posts JOIN comments ON comments.post_id = posts.id WHERE comments.post_id = ${commentId} AND posts.id = ${postId}', {commentId,postId})
}




module.exports = postService;