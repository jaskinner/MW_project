const express = require("express"),
    app = express(),
    path = require("path"),
    router = require("./routes"),
    PORT = 3000;

/* ****
App setup
**** */

app.set("view engine", "pug");
app.set("views", path.join(__dirname + "/views"));

/* ****
Routes 
**** */

app.use(router);

app.listen(PORT, () => {
    console.log(`** Server is running on port ${PORT}`);
});
