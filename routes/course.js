const express = require('express');
const Router= express.Router();
const {CourseValidation,Courses}=require('../models/courseModel');

Router.post("/",async(req,res)=>{ 
    const { error,NotFoundError }= await CourseValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    if(NotFoundError) return res.status(400).send(NotFoundError);

    const Course= new Courses(req.body);  
    await Course.save();
    res.send(Course);
})

Router.get("/",async(req,res)=>{
    const AllCourses=await Courses.find();
    res.send(AllCourses);
})

Router.get("/:id",async(req,res)=>{
    try {
    const Course= await Courses.findById(req.params.id).populate("Language");
    if(Course===null) return;
    res.send(Course);
    } catch (error) {
        console.log(error)
    }    
})

Router.put("/:id",async(req,res)=>{
    const Course= await Courses.findOneAndUpdate({"_id":req.params.id},req.body,{new:true})
    res.send(Course);
})

Router.delete("/:id",async(req,res)=>{
    const Course=await Courses.findByIdAndDelete(req.params.id);
    res.send(Course);
})

module.exports.course=Router;