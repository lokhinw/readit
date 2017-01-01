var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    app = express();

mongoose.connect("mongodb://localhost/readit");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function(req, res) {
  res.send("test");
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
