const express = require('express');
const Mongoose=require('mongoose');
const Router= express.Router();
const {Language,LanguageValidation}=require('../models/courseOptions');
const Languages=Mongoose.model("Languages",Language);


Router.post("/",async(req,res)=>{
    console.log(req.body);    
    const {error}=LanguageValidation(req.body);   
    if(error)return res.status(400).send(error.details[0].message);
    try{
    const language =new Languages(req.body);
    await language.save();
    res.send(language);
      }catch(err){
     //logger
      }   
});

Router.get("/",async(req,res)=>{
    const languageCollection=await Languages.find();
    if(!languageCollection)res.send("No Languages");
    //logger
    res.send(languageCollection);
});

Router.get("/:id",async(req,res)=>{
    const language =await Languages.findById(req.params.id);
    if(!language)res.status(404).send("Not Found");
    //logger
    res.send(language);
});

Router.put("/:id",async(req,res)=>{
    try{
    const language= await Languages.findOneAndUpdate({"_id":req.params.id},req.body,{new:true});
    res.send(language);
    }catch{
    //logger
    }   
});
Router.delete("/:id",async(req,res)=>{
  try{
      const language=await Languages.findByIdAndDelete(req.params.id);
      res.send(language);
  }catch{
    //logger
  }
});

module.exports={"languages":Router,
                 "LanguageDocument":Languages};