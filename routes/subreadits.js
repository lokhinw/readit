var express = require("express"),
    router = express.Router(),
    Subreadit = require("../models/subreadit"),
    Post = require("../models/post");

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

router.get("/", function(req, res) {
    res.render("subreadits");
});

router.get("/new", function(req, res) {
    res.render("subreadits/new");
});

router.get("/:name", function(req, res) {
    Subreadit.findOne({
        "name": req.params.name
    }).populate("posts").exec(function(err, subreadit) {
        if (err) {
            console.log(err);
        } else {
            res.render("subreadits/subreadit", {
                subreadit: subreadit
            });
        }
    });
});

router.post("/", function(req, res) {
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

module.exports = router;
