const express = require("express");
const app = new express;
const port = process.env.PORT || 9090;

app.get("/", function(req, res){res.sendfile("./MainPage.html")});
app.get("/MainPageFunctionality", function(req, res){res.sendfile("./MainPageFunctionality")});
app.listen(port);
