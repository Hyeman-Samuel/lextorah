const express = require('express');
const Mongoose=require('mongoose');
const Router= express.Router();
const {City,CityValidation}=require('../models/courseOptions');
const Cities=Mongoose.model("Cities",City);

Router.post("/",async(req,res)=>{
    console.log(req.body);    
    const {error}=CityValidation(req.body);   
    if(error)return res.status(400).send(error.details[0].message);
    try{
    const City =new Cities(req.body);
    await City.save();
    res.send(City);
      }catch(err){
     //logger
      }   
});

Router.get("/",async(req,res)=>{
    const CityCollection=await Cities.find();
    if(!CityCollection)res.send("No Cities");
    //logger
    res.send(CityCollection);
});

Router.get("/:id",async(req,res)=>{
    const City =await Cities.findById(req.params.id);
    if(!City)res.status(404).send("Not Found");
    //logger
    res.send(City);
});

Router.put("/:id",async(req,res)=>{
    try{
    const City= await Cities.findOneAndUpdate({"_id":req.params.id},req.body,{new:true});
    res.send(City);
    }catch{
    //logger
    }   
});
Router.delete("/:id",async(req,res)=>{
  try{
      const City=await Cities.findByIdAndDelete(req.params.id);
      res.send(City);
  }catch{
    //logger
  }
});

module.exports={
  "cities":Router,
   "CityDocument":Cities
  };