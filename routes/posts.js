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
    Subreadit.findOne({
        "name": req.params.name
    }, function(err, subreadit) {
        if (err) {
            console.log(err);
        } else {
            Post.create(req.body.post, function(err, post) {
                if (err) {
                    console.log(err);
                } else {
                    post.save();
                    subreadit.posts.push(post);
                    subreadit.save();
                }
            });
        }
    });
});

router.get("/:id", function(req, res) {
    Subreadit.findOne({
        "name": req.params.name
    }, function(err, subreadit) {
        if (err) {
            console.log(err);
        } else {
            Post.findById(req.params.id).populate("comments").exec(function(err, post) {
                if (err) {
                    res.render("404");
                } else {
                    res.render("posts/post", {
                        subreadit: subreadit,
                        post: post
                    });
                }
            });
        }
    });
});

module.exports = router;
