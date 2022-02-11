const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
});
var User = mongoose.model("User", UserSchema);
module.exports = User