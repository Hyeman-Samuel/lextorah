const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const Mongoose=require('mongoose');
const _=require('lodash');
const {CourseSchedule,PersonalInformation,Languages,CourseTypes,Cities,CourseLevels}=require('./courseOptions');

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
const Courses= Mongoose.model('Courses',CourseSchema);

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
    const Language=await Languages.findById(Course.Language);
    const CourseLevel=await CourseLevels.findById(Course.CourseLevel);
    const CourseType=await CourseTypes.findById(Course.CourseType);
    const City=await Cities.findById(Course.City);

   if(!Language&&!CourseLevel&&!City&&!CourseType){
     return {"NotFoundError":"Invalid.Language/City/CourseType/CourseLevel no longer exists "}
   }
   return Joi.validate(_.omit(Course,["Schedule","Students"]),Schema);
}

module.exports={
    "courseSchemas":CourseSchema,
    "CourseValidation":ValidateCourse,
    "Courses":Courses
};