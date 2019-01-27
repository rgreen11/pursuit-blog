const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost/blog');
const UserService = {};

UserService.create = (username, email, password) => {
    console.log('getting here', username, email, password)
    
   return db.none('INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})', {username: username, email: email, password: password})

}

UserService.read = (id) => {
console.log('is it here')
return db.one('SELECT username, email FROM users WHERE users.id = ${id} ', {id})
    
 }

 UserService.postBody = (id) =>{
     console.log('You are warm');   
     return db.any('SELECT posts.*, users.username FROM posts JOIN users ON users.id = posts.author WHERE users.id = ${id}', {id});
 }

UserService.postId = (userId, postId) =>{
    console.log('made it here so far', postId)
    return db.any('SELECT posts.*, users.username FROM posts JOIN users ON posts.author = users.id WHERE users.id = ${userId} AND posts.id = ${postId}', {userId, postId})
}

UserService.postComment = (id) => {
    console.log('keep it up')
    return db.any('SELECT comments.*, users.username FROM comments JOIN users ON users.id = comments.author WHERE users.id = ${id}', {id});
}

UserService.commentId = (userId, commentsId) =>{
    console.log('made it here so far', commentsId)
    return db.one('SELECT comments.*, users.username FROM comments JOIN users ON users.id = comments.author  WHERE users.id = ${userId} AND comments.author = ${commentsId}', {userId, commentsId})
}

module.exports = UserService;