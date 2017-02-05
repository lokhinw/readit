var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: String
});

module.exports = mongoose.model("Comment", commentSchema);
