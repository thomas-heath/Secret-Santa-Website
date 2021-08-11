const express = require("express");
const app = new express;
const port = process.env.PORT || 9090;

res.set("Content-Security-Policy", "script-src 'sha256-TiQT/8XjWSgRBdzJ52KzmEE9xTRXi1IDz09PBCu8W7g='");

app.get("/", function(req, res){res.sendfile("./MainPage.html")});
app.get("/MatchedSantas", function(req, res){res.sendfile("./SecondPage.html")});
app.get("/Result", function(req, res){res.sendfile("./ResultsPage.html")});
app.get("/SharedFunctions.js", function(req, res){res.sendfile("./SharedFunctions.js")});
app.get("/MainPageFunctionality.js", function(req, res){res.sendfile("./MainPageFunctionality.js")});
app.get("/SecondPageFunctionality.js", function(req, res){res.sendfile("./SecondPageFunctionality.js")});
app.listen(port);
