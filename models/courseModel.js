const Joi=require('joi');
const Mongoose=require('mongoose');
const {CourseSchedule,PersonalInformation}=require('./courseOptions');


const CourseSchema=new Mongoose.Schema({
    "Title":{type:String,required:true},
    "Language":{type:Mongoose.Schema.Types.ObjectId,ref:"Languages"},
    "City":{type:Mongoose.Schema.Types.ObjectId,ref:"Cities"},
    "CourseType":{type:Mongoose.Schema.Types.ObjectId,ref:"CourseTypes"},
    "CourseLevel":{type:Mongoose.Schema.Types.ObjectId,ref:"CourseLevels"},
    "StartDate":{type:Date,required:true},
    "EndDate":{type:Date,required:true},
    "Price":{type:Number},
    "Schedule":{type:CourseSchedule,required:true},
    "Students":[PersonalInformation]
})

function ValidateCourse(Course){
////Use Joi.ObjectId
}

module.exports={
    "courseSchemas":CourseSchema,
    "CourseValidation":ValidateCourse
};