var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    Subreadit = require("./models/subreadit"),
    Post = require("./models/post"),
    bodyParser = require("body-parser");

var subreaditRoutes = require("./routes/subreadits"),
    postRoutes = require("./routes/posts"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/readit");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);
app.use("/r", subreaditRoutes);
app.use("/r/:name", postRoutes);

app.get("*", function(req, res) {
    res.render("404");
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});
