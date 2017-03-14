var express = require("express"),
    router = express.Router(),
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

router.get("/", function(req, res) {
    res.render("index");
});

module.exports = router;
