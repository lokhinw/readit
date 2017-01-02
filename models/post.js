var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Post", postSchema);
