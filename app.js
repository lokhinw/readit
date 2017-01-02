var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");
var subs = ["all", "tifu", "pics"];
mongoose.connect("mongodb://localhost/readit");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/r", function(req, res) {
    res.render("subreadit", {subreadits: subs});
});

app.get("*", function(req, res) {
    res.render("404");
});

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});
