const express = require("express");
const app = new express;
const port = process.env.PORT || 9090;

<<<<<<< HEAD
app.get("/", function(req, res){
    res.append("Content-Security-Policy-Report-Only", "script-src 'sha256-TiQT/8XjWSgRBdzJ52KzmEE9xTRXi1IDz09PBCu8W7g='")
    res.sendfile("./MainPage.html")});
=======
app.get("/", function(req, res){res.sendfile("./MainPage.html")});
>>>>>>> parent of c32c2ae (Added a CSP Policy to test it)
app.get("/MatchedSantas", function(req, res){res.sendfile("./SecondPage.html")});
app.get("/Result", function(req, res){res.sendfile("./ResultsPage.html")});
app.get("/SharedFunctions.js", function(req, res){res.sendfile("./SharedFunctions.js")});
app.get("/MainPageFunctionality.js", function(req, res){res.sendfile("./MainPageFunctionality.js")});
app.get("/SecondPageFunctionality.js", function(req, res){res.sendfile("./SecondPageFunctionality.js")});
app.listen(port);
