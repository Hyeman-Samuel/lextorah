const express = require('express');
const Router= express.Router();
const _=require("lodash");
const {Courses}=require('../models/courseModel');
const {Languages,Cities,CourseLevels,CourseTypes,PersonalInformationValidation}=require("../models/courseOptions");
const {verifyPayment,initializePayment}=require('../models/paystack')();

////1 Select A course nature
Router.get("/courseform",async(req,res)=>{
    const SelectDropDownItems=await GetDropDownInfo();  
   res.render("courseNature",{"layout":"formLayout.hbs",SelectDropDownItems});
})
////

///2 Display the courses of such nature
Router.get("/course",async(req,res)=>{
    const AllCourses=await Courses.find({
        "Language":req.query.Language,
        "City":req.query.City,
        "CourseType":req.query.CourseType,
        "CourseLevel":req.query.CourseLevel}).lean();
    res.render("course",{"layout":"formLayout.hbs",AllCourses});
})
/////

///3 Display a form to enroll for selected course
Router.get("/personalinfo",async(req,res)=>{ 
   const course=req.query.course;
   const Exists=Courses.findById(course);
   if(!Exists) {res.render("NotExist");
   }
   res.render("enroll",{"layout":"formLayout.hbs","courseId":course});
})
/////

///4 validate user,add user,make paystack call
Router.post("/payment",async(req,res)=>{   
    const {error} = PersonalInformationValidation(_.omit(req.body,["IsNotifyable","courseId"]));
    if(error)return  res.render("enroll",{"layout":"formLayout.hbs","error":error.details[0].message,"req.body":req.body});
        ///Returns error message

    const CourseId=req.body.courseId
    if(!CourseId)return res.render("enroll",{"layout":"formLayout.hbs","error":error.details[0].message,"req.body":req.body});
    const Course = await Courses.findById(CourseId).select(["Price"]).lean();
    /////Create new Student and add to course
    const form ={
         "full_name":`${req.body.FirstName} ${req.body.SurName}`,
         "email":req.body.Email,
         "amount":Course.Price *100,
         "metadata":{
             "courseId":CourseId,
         }
     }

    initializePayment(form,(err,body)=>{
         if(err)return  console.log(err);///Do not console log on production
         const response = JSON.parse(body);
         if(response.status)return  res.redirect(response.data.authorization_url); 
})
    ////Retunn
})
////

///5 Paystack Callback and verify the user's Payment
Router.get("/payment/callback",async(req,res)=>{   
    const ref = req.query.reference;
    verifyPayment(ref,(err,body)=>{
           if(err){
             return  console.log(err);///I will not console log on production
           }
        const response = JSON.parse(body);
        if(response.status){
         /////Set student's Payment status to paid
         return console.log(response.data.metadata);
        }       
    })
    ////Validate user and add and make paystack stuff
    res.send(req.body);
})
////

 async function GetDropDownInfo(){
    const languages=await Languages.find().lean();
    const cities=await Cities.find().lean();
    const courseLevels =await CourseLevels.find().lean();
    const courseTypes=await CourseTypes.find().lean();

    return {languages,cities,courseLevels,courseTypes};
 }


/////Exports

module.exports={"enroll":Router}