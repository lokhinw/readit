var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    Subreadit = require("./models/subreadit"),
    Post = require("./models/post"),
    bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/readit");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    Subreadit.find({}, function(err, subreadits) {
        if (err) {
            // TODO: Add error handling
        } else {
            res.locals.subreadits = subreadits;
            next();
        }
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/r", function(req, res) {
    res.render("subreadits");
});

app.get("/r/new", function(req, res) {
    res.render("newsub");
});

app.get("/r/:name", function(req, res) {
    Subreadit.findOne({
        "name": req.params.name
    }, function(err, subreadit) {
        if (subreadit) {
            Post.find({}, function(err, posts) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("subreadit", {
                        subreadit: subreadit,
                        posts: posts
                    });
                }
            });

        } else {
            res.redirect("back");
            // TODO: Add error handling
        }
    });
});

app.get("/r/:name/new", function(req, res) {
    Subreadit.findOne({
        "name": req.params.name
    }, function(err, subreadit) {
        if (subreadit) {
            res.render("newpost", {
                subreadit: subreadit
            });
        } else {
            res.redirect("back");
            // TODO: Add error handling
        }
    });
});
app.get("/r/:name/:id", function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            res.render("404");
        } else {
            res.render("post", {
                post: post
            });
        }
    });
});
app.post("/r/:name/new", function(req, res) {
    Post.create({
        title: req.body.title,
        body: req.body.body
    }, function(err, post) {
        if (err) {

        } else {

        }
    });
});

app.post("/r", function(req, res) {
    Subreadit.find({
        name: new RegExp('^' + req.body.name + '$', "i")
    }, function(err, subreadit) {
        if (subreadit && subreadit.length === 0) {
            Subreadit.create({
                name: req.body.name,
                description: req.body.description
            }, function(err, subreadit) {
                if (err) {
                    // TODO: Add error handling for creating subreadit
                } else {
                    res.redirect("/r");
                }
            });
        } else {
            res.redirect("back");
        }
    });
});

app.get("*", function(req, res) {
    res.render("404");
});


app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});
