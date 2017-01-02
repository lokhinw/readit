var mongoose = require("mongoose");

var subreaditSchema = new mongoose.model({
    name: String
});

module.exports = mongoose.model("Subreadit", subreaditSchema);
