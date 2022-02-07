const path = require("path"),
    async = require("async");

const handleFile = (req, res) => {
    async.waterfall(
        [
            function (cb) {
                let newFile;
                let redaction;

                if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send("No files were uploaded.");
                }

                if (!req.body || Object.keys(req.body).length === 0) {
                    return res.status(400).send("No keywords were entered.");
                }

                redaction = req.body.redact;
                newFile = req.files.newFile;

                cb(null, newFile, redaction);
            },
            function (newFile, redaction, cb) {
                let fileText = newFile.data.toString("utf8");
                let pattern = /\w+|"[^"]+"|'[^']+'/;
                let regexp = new RegExp(pattern, "gi");
                let redactArr = redaction.match(regexp);

                for (let elm of redactArr) {
                    if (elm[0] === "'") elm = elm.replaceAll("'", "");
                    if (elm[0] === '"') elm = elm.replaceAll('"', "");

                    let mask = new RegExp('\\b' + elm + '\\b', "ig");

                    fileText = fileText.replace(mask, "XXXX");
                }

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
