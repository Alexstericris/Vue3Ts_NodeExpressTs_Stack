const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RoleSchema = new Schema({
    name: String
});
var Role = mongoose.model("Post", RoleSchema);
module.exports = Role;