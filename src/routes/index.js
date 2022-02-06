const express = require("express"),
    router = express.Router(),
    { handleFile } = require("../helpers");

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/upload", handleFile);

router.get("/thanks", (req, res) => {
    res.render("thanks");
});

router.get("*", (req, res) => res.render("404"));

module.exports = router;
