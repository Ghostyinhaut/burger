var express = require("express");

var app = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//create routes
app.get("/",function(req,res){
    burger.selectAll(function(result){
        var hbsObject ={
            burgers: result
        }
        console.log(hbsObject);
        res.render("index",hbsObject);
    });
});

app.post("/api/burgers",function(req,res){
    burger.insertOne([
        "burger"
    ],[
        req.body.burger 
    ], function(result){
        res.redirect("/")
    }
    );
});

app.put("/burgers/:id",function(req,res){
    var condition = "id=" +req.params.id;

    burger.updateOne({
        devoured: true
    },condition,function(result){
        res.redirect("/");
    });
});

//export app for server.js

module.exports =app;

