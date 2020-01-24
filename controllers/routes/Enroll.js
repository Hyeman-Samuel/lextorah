const express = require('express');
const Router= express.Router();
const _=require("lodash");
const {Courses}=require("../../models/courseModel");
const {Languages,Cities,CourseLevels,CourseTypes,PersonalInformationValidation,Students}=require("../../models/courseOptions");
const {verifyPayment,initializePayment}=require('../../models/paystack')();
const {SendMail,CreateEmailText}=require("../../models/mailer");

////1 Select A course nature
Router.get("/courseform",async(req,res)=>{
    const SelectDropDownItems=await GetDropDownInfo();  
   res.render("subView/courseform/courseNature.hbs",{"layout":"formLayout.hbs",SelectDropDownItems});
})
////

///2 Display the courses of such nature
Router.get("/course",async(req,res)=>{
    const AllCourses=await Courses.find({
        "Language":req.query.Language,
        "City":req.query.City,
        "CourseType":req.query.CourseType,
        "CourseLevel":req.query.CourseLevel}).lean();
    res.render("subView/courseform/course.hbs",{"layout":"formLayout.hbs",AllCourses});
})
/////

///3 Display a form to enroll for selected course
Router.get("/personalinfo",async(req,res)=>{ 
   const Exists=Courses.findById(req.query.course);
   if(!Exists) {res.render("NotExist");
   }
   res.render("subView/courseform/enroll.hbs",{"layout":"formLayout.hbs","courseId":course});
})
/////

///4 validate user,add user,make paystack call
Router.post("/payment",async(req,res)=>{   
    const {error} = PersonalInformationValidation(_.omit(req.body,["IsNotifyable","courseId"]));
    if(error)return  res.render("subView/courseform/enroll.hbs",{"layout":"formLayout.hbs","error":error.details[0].message,"req.body":req.body});
        ///Returns error message

    const CourseId=req.body.courseId
    if(!CourseId)return res.render("subView/courseform/enroll.hbs",{"layout":"formLayout.hbs","error":"This course has been removed","req.body":req.body});
try {
    
    const Student=new Students(_.omit(req.body,["courseId"]));
    Student.save();///Creates New Student
    const Course = await Courses.findById(CourseId);
    Course.Students.push(Student.id);
    Course.save();
    /////Create new Student and adds to course
    const form ={
         "full_name":`${req.body.FirstName} ${req.body.SurName}`,
         "email":req.body.Email,
         "amount":Course.Price *100,
         "metadata":{
             "courseId":CourseId,
             "studentId":Student.id
         }
     }

    initializePayment(form,(err,body)=>{
         if(err)return  console.log(err);///Do not console log on production
         const response = JSON.parse(body);
         if(response.status)return  res.redirect(response.data.authorization_url); 
})
} catch (error) {
    ///
}
    ////If it reaches here something is wrong
})
////

///5 Paystack Callback and verify the user's Payment
Router.get("/payment/callback",async(req,res)=>{   
    const ref = req.query.reference;
    verifyPayment(ref,(err,body)=>{
        if(err){
            return ;
        }
        const response = JSON.parse(body);
        if(response.status){    
          async function verify(){
            var Student= await Students.findByIdAndUpdate(response.data.metadata.studentId,{ $set:{ "HasPaid":true}},{new:true});
            SendMail(Student.Email,"SCHEDULE OF LEXTORAH COURSE",CreateEmailText(await Courses.findById(response.data.metadata.courseId)))
            }
            try {
                verify();
                } catch (error) {
                ////redirect
                }
        }else{
            ////send email that payment should be made 
        }   

    })
    ////Validate user and add and make paystack stuff     
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