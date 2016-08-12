var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String, //hash created from password
    created_at: {type: Date, default: Date.now}
});

var postSchema = new Schema ({
    
    text:String,
    created_by: String,
    created_at:{type: Date, default: Date.now}
    
})


//Declare model called User which has respective fields and model called post with respective

var User = mongoose.model("User", userSchema);
var Post = mongoose.model("Post", postSchema);


module.exports = User;
module.exports = Post;
