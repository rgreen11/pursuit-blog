const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/public/user')
const postRoutes = require('./routes/public/post')
const commentRoutes = require('./routes/public/comment')


//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
// user
app.use('/user', userRoutes)
//post
app.use('/post', postRoutes)
//comments
app.use('/comments', commentRoutes)
// app.use('/user', pUserRoutes)

// global middle ware ex: 
// req.params vs req.header
/*
params - :variable always checking for params;

query - ?data = something // can send whatever they want 

header - passed through client

body - place never cache its always encrypted. Ususally sensitive and abstract and large data

*/


app.listen(port, ()=> {
    console.log('listening on port', port)
})