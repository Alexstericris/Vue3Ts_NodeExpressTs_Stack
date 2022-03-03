const Post = require("../models/posts");
module.exports = class PostsController{
    static getPosts(req, res) {
        return Post.find({}, 'title description', function (error, posts) {
            if (error) {
                console.error(error);
            }
            res.send({
                posts: posts
            })
        }).sort({_id: -1})
    }
}