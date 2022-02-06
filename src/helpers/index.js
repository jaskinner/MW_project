const path = require("path");

const handleFile = (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = path.join(__dirname + "../../../tmp/" + sampleFile.name);

    console.log(sampleFile.data.toString("utf8"));

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        res.send("File uploaded!");
    });
};

const renderSuccess = (req, res) => {
    res.render("index");
};

module.exports = {
    renderSuccess: renderSuccess,
    handleFile: handleFile,
};
