var express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Post = require("../models/post"),
    Subreadit = require("../models/subreadit"),
    Comment = require("../models/comment");

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
            Post.findById(req.params.id, function(err, post) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("comments/new", {
                        subreadit: subreadit,
                        post: post
                    });
                }
            });
        }
    });
});

router.post("/new", function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                }
            });
        }
    });
});

module.exports = router;
