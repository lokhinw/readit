var mongoose = require("mongoose");

var subreaditSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model("Subreadit", subreaditSchema);
