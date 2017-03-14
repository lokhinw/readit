var mongoose = require("mongoose");

var subreaditSchema = new mongoose.Schema({
    name: String,
    description: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

module.exports = mongoose.model("Subreadit", subreaditSchema);
