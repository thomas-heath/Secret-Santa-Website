const express = require("express");
const app = new express;
const port = process.env.PORT || 9090;

app.get("/", function(req, res){res.sendfile("./MainPage.html")});
//app.get("/backend", function(req, res){res.sendfile("./secretsanta.js")});
app.listen(port);
