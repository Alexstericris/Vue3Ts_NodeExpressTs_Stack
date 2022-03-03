const Post = require("../models/posts");
const PostsController = require("../controllers/PostsController");
const UserController = require("../controllers/UserController");
var registerApiRoutes=(app)=>{
    app.get('/posts', PostsController.getPosts);
    app.post('/register',UserController.register)
// // Post Endpoints
//     app.post('/posts', (req, res) => {
//         var db = req.db;
//         var title = req.body.title;
//         var description = req.body.description;
//         var new_post = new Post({
//             title: title,
//             description: description
//         })
//
//         new_post.save(function (error) {
//             if (error) {
//                 console.log(error)
//             }
//             res.send({
//                 success: true,
//                 message: 'Post saved successfully!'
//             })
//         })
//     })
//
// // Fetch single post
//     app.get('/post/:id', (req, res) => {
//         var db = req.db;
//         Post.findById(req.params.id, 'title description', function (error, post) {
//             if (error) { console.error(error); }
//             res.send(post)
//         })
//     })
//
// // Update a post
//     app.put('/posts/:id', (req, res) => {
//         var db = req.db;
//         Post.findById(req.params.id, 'title description', function (error, post) {
//             if (error) { console.error(error); }
//
//             post.title = req.body.title
//             post.description = req.body.description
//             post.save(function (error) {
//                 if (error) {
//                     console.log(error)
//                 }
//                 res.send({
//                     success: true
//                 })
//             })
//         })
//     })
//
// // Delete a post
//     app.delete('/posts/:id', (req, res) => {
//         var db = req.db;
//         Post.remove({
//             _id: req.params.id
//         }, function(err, post){
//             if (err)
//                 res.send(err)
//             res.send({
//                 success: true
//             })
//         })
//     })
    
}
module.exports=registerApiRoutes