const express = require('express');
const Mongoose=require('mongoose');
const Router= express.Router();
const {CourseLevel,CourseLevelValidation}=require('../models/courseOptions');
const CourseLevels=Mongoose.model("CourseLevels",CourseLevel);

Router.post("/",async(req,res)=>{
    console.log(req.body);    
    const {error}=CourseLevelValidation(req.body);   
    if(error)return res.status(400).send(error.details[0].message);
    try{
    const courseLevels =new CourseLevels(req.body);
    await courseLevels.save();
    res.send(courseLevels);
      }catch(err){
     //logger
      }   
});

Router.get("/",async(req,res)=>{
    const courseLevelsCollection=await CourseLevels.find();
    if(!courseLevelsCollection)res.send("No CourseLevels");
    //logger
    res.send(courseLevelsCollection);
});

Router.get("/:id",async(req,res)=>{
    const courseLevels =await CourseLevels.findById(req.params.id);
    if(!courseLevels)res.status(404).send("Not Found");
    //logger
    res.send(courseLevels);
});

Router.put("/:id",async(req,res)=>{
    try{
    const courseLevels= await CourseLevels.findOneAndUpdate({"_id":req.params.id},req.body,{new:true});
    res.send(courseLevels);
    }catch{
    //logger
    }   
});
Router.delete("/:id",async(req,res)=>{
  try{
      const courseLevels=await CourseLevels.findByIdAndDelete(req.params.id);
      res.send(courseLevels);
  }catch{
    //logger
  }
});

module.exports={"courseLevels":Router,
                "CourseLevelDocument":CourseLevels};