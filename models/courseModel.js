const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const Mongoose=require('mongoose');
const _=require('lodash');
const {CourseSchedule,PersonalInformation,PersonalInformationValidation}=require('./courseOptions');
const {LanguageDocument}=require("../routes/language");
const {CourseTypeDocument}=require("../routes/courseType");
const {CourseLevelDocument}=require("../routes/courseLevel");
const {CityDocument}=require("../routes/city");

const CourseSchema=new Mongoose.Schema({
    "Title":{type:String,required:true},
    "Language":{type:Mongoose.Schema.Types.ObjectId,ref:"Languages"},
    "City":{type:Mongoose.Schema.Types.ObjectId,ref:"Cities"},
    "CourseType":{type:Mongoose.Schema.Types.ObjectId,ref:"CourseTypes"},
    "CourseLevel":{type:Mongoose.Schema.Types.ObjectId,ref:"CourseLevels"},
    "StartDate":{type:Date,required:true},
    "EndDate":{type:Date,required:true},
    "Price":{type:Number,default:0},
    "Schedule":{type:CourseSchedule},
    "Students":[PersonalInformation]
})

async function ValidateCourse(Course){
    const Schema ={
        "Title":Joi.string().required(),
        "Language":Joi.objectId().required(),
        "City":Joi.objectId().required(),
        "CourseType":Joi.objectId().required(),
        "CourseLevel":Joi.objectId().required(),
        "StartDate":Joi.date().required(),
        "EndDate":Joi.date().required(),
        "Price":Joi.number().required()
    }
    const Language=await LanguageDocument.findById(Course.Language);
    const CourseLevel=await CourseLevelDocument.findById(Course.CourseLevel);
    const CourseType=await CourseTypeDocument.findById(Course.CourseType);
    const City=await CityDocument.findById(Course.City);

   if(!Language&&!CourseLevel&&!City&&!CourseType){
     return {"NotFoundError":"Invalid.Language/City/CourseType/CourseLevel no longer exists "}
   }
   return Joi.validate(_.omit(Course,["Schedule","Students"]),Schema);
}

module.exports={
    "courseSchemas":CourseSchema,
    "CourseValidation":ValidateCourse
};