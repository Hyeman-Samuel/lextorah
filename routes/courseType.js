const express = require('express');
const Mongoose=require('mongoose');
const Router= express.Router();
const {CourseTypeValidation,CourseTypes}=require('../models/courseOptions');


Router.post("/",async(req,res)=>{  
    const {error}=CourseTypeValidation(req.body);
    if(error)return res.status(400).send("Incorrect Info");
    try{
    const courseTypes =new CourseTypes(req.body);
    await courseTypes.save();
    res.send(courseTypes);
      }catch(err){
     //logger
      }    
});

Router.get("/",async(req,res)=>{
    const courseTypesCollection=await CourseTypes.find();
    if(!courseTypesCollection)res.send("No CourseTypes");
    //logger
    res.send(courseTypesCollection);
});

Router.get("/:id",async(req,res)=>{
    
    const courseTypes =await CourseTypes.findById(req.params.id);
    if(!courseTypes)res.status(404).send("Not Found");
    //logger
    res.send(courseTypes);
});

Router.put("/:id",async(req,res)=>{
    try{
    const courseTypes= await CourseTypes.findOneAndUpdate({"_id":req.params.id},req.body,{new:true});
    res.send(courseTypes);
    }catch{
    //logger
    }   
});
Router.delete("/:id",async(req,res)=>{
  try{
      const courseTypes=await CourseTypes.findByIdAndDelete(req.params.id);
      res.send(courseTypes);
  }catch{
    //logger
  }
});

module.exports={"courseTypes":Router};