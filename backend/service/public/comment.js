const pgp = require('pg-promise')({});
const db = pgp('postgress://localhost/blog');
const postService = {};


postService.read = (id) => {
    console.log('comments')
    return db.any('SELECT * FROM comments WHERE id = ${id} ', {id})

}

module.exports = postService;