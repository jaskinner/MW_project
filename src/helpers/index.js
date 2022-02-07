const path = require("path"),
    async = require("async");

const handleFile = (req, res) => {
    async.waterfall(
        [
            function (cb) {
                let newFile;

                if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send("No files were uploaded.");
                }

                newFile = req.files.newFile;

                cb(null, newFile);
            },
            function (newFile, cb) {
                let fileText = newFile.data.toString("utf8");
                fileText = fileText.replace(/the/g, "XXXX");

                cb(null, fileText);
            },
        ],
        function (err, results) {
            res.render("thanks", { results: results });
        }
    );
};

module.exports = {
    handleFile: handleFile,
};
