const express = require("express");
const Router= express.Router();


Router.get("/",(req,res)=>{
    res.render9
})
Router.get("/languages",(req,res)=>{
    res.render("languages",{"layout": "admin.hbs"})
})
Router.get("/cities",(req,res)=>{
    res.render("cities",{"layout": "admin.hbs"})
})
Router.get("/coursetypes",(req,res)=>{
    res.render("coursetypes",{"layout": "admin.hbs"})
})
module.exports = Router;