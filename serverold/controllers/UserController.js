var db=require('../services/db')
const User = require("../models/User");
module.exports = class UserController{
    static register(req, res) {
        console.log('ey')
        var newUser=new User(req.body.user)
        newUser.save(function (error){
            if (error) {
                console.log(error)
            }
        });
    }
}