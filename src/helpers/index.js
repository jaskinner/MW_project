const handleFile = (req, res) => {
        res.redirect("/thanks");
    },
    renderSuccess = (req, res) => {
        res.render("index");
    };

module.exports = {
    renderSuccess: renderSuccess,
    handleFile: handleFile,
};
