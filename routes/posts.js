var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Post = require("../models/post"),
    Subreadit = require("../models/subreadit");

router.use(function(req, res, next) {
    Subreadit.find({}, function(err, subreadits) {
        if (err) {
            // TODO: Add error handling
        } else {
            res.locals.subreadits = subreadits;
            next();
        }
    });
});

router.get("/new", function(req, res) {
    Subreadit.findOne({
        "name": req.params.name
    }, function(err, subreadit) {
        if (err) {
            console.log(err);
        } else {
            res.render("posts/new", {
                subreadit: subreadit
            });
        }
    });
});

router.post("/new", function(req, res) {
    Post.create({
        title: req.body.title,
        body: req.body.body
    }, function(err, post) {
        if (err) {

        } else {

        }
    });
});

router.get("/:id", function(req, res) {
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

module.exports = router;
