const Joi=require('joi');
const Mongoose=require('mongoose');

////LanguageModel
const LanguageSchema=new Mongoose.Schema({
      "title":{type:String,required:true}
})

function ValidateLanguage(Language){
    const schema={
        "title":Joi.string().required()
    }
    return Joi.validate(Language,schema);
}

const Languages=Mongoose.model("Languages",LanguageSchema);

///////CityModel
const CitySchema=new Mongoose.Schema({
    "name":{type:String,required:true}
})

function ValidateCity(City){
    const schema={
        "name":Joi.string().required()
    }
    return Joi.validate(City,schema);
}
const Cities=Mongoose.model("Cities",CitySchema);

/////CourseTypeModel
const CourseTypeSchema=new Mongoose.Schema({
    "name":{type:String,required:true},
    "DurationInWeeks":{type:Number,required:true}    
})

function ValidateCourseType(CourseType){
    const schema={
        "name":Joi.string().required(),
        "DurationInWeeks":Joi.number().required()
    }
    return Joi.validate(CourseType,schema);
}
const CourseTypes=Mongoose.model("CourseTypes",CourseTypeSchema);

/////CourseLevelModel
const CourseLevelSchema=new Mongoose.Schema({
    "name":{type:String,required:true},
    "levelcode":{type:String,required:true}    
})

function ValidateCourseLevel(CourseLevel){
    const schema={
        "name":Joi.string().required(),
        "levelcode":Joi.string().required()
    }
    return Joi.validate(CourseLevel,schema);
}
const CourseLevels=Mongoose.model("CourseLevels",CourseLevelSchema);

/////CourseScheduleModel
const CourseScheduleSchema=new Mongoose.Schema({
    "Monday":{type:String,default:"No Class"},
    "Tuesday":{type:String,default:"No Class"},
    "Wednesday":{type:String,default:"No Class"},
    "Thursday":{type:String,default:"No Class"},
    "Friday":{type:String,default:"No Class"},
    "Saturday":{type:String,default:"No Class"},
    "Sunday":{type:String,default:"No Class"}
})


//////Personal Information
const PersonalInformation=new Mongoose.Schema({
    "FirstName":{type:String,required:true,max:20},
    "SurName":{type:String,required:true,max:20},
    "DateOfBirth":{type:Date,required:true},
    "Gender":{type:String,required:true},
    "Email":{type:String,required:true,max:50},
    "Phone":{type:Number,required:true,max:15},
    "Address1":{type:String,required:true,max:50},
    "Address2":{type:String,max:50},
    "Town":{type:String,required:true},
    "Nationality":{type:String,required:true},
    "EmergencyContactName":{type:String,required:true,max:15},
    "EmergencyContactRelationship":{type:String,required:true,max:15},
    "EmergencyContactPhoneNumber":{type:Number,required:true,max:13},
    "EmergencyContactEmail":{type:String,required:true,max:50},
    "IsNotifyable":{type:Boolean},
    "RefeeralSource":{type:String,max:20},
    "Reason":{type:String,required:true,max:100},
    "OtherConcerns":{type:String,max:100},
    "HasPaid":{type:Boolean,default:false},
})

function ValidateStudent(PersonalInformation){
    const schema={
    "FirstName":Joi.string().max(20).required(),
    "SurName":Joi.string().max(20).required(),
    "DateOfBirth":Joi.string().required(),
    "Gender":Joi.string().required(),
    "Email":Joi.string().max(50).required(),
    "Phone":Joi.string().max(15).required(),
    "Address1":Joi.string().max(50).required(),
    "Address2":Joi.string().max(50),
    "Town":Joi.string().required(),
    "Nationality":Joi.string().required(),
    "EmergencyContactName":Joi.string().max(15).required(),
    "EmergencyContactRelationship":Joi.string().max(15).required(),
    "EmergencyContactPhoneNumber":Joi.string().max(13).required(),
    "EmergencyContactEmail":Joi.string().max(50).required(),
    "RefeeralSource":Joi.string().max(20),
    "Reason":Joi.string().max(100).required(),
    "OtherConcerns":Joi.string().max(100)
    }
    return Joi.validate(PersonalInformation,schema);
}
/////////


///Exports
module.exports={
    "Language":LanguageSchema,
    "LanguageValidation":ValidateLanguage,
    "City":CitySchema,
    "CityValidation":ValidateCity,
    "CourseType":CourseTypeSchema,
    "CourseTypeValidation":ValidateCourseType,
    "CourseLevel":CourseLevelSchema,
    "CourseLevelValidation":ValidateCourseLevel,
    "CourseSchedule":CourseScheduleSchema,     
    "PersonalInformation":PersonalInformation,
    "PersonalInformationValidation":ValidateStudent,
    "Languages":Languages,
    "CourseTypes":CourseTypes,
    "CourseLevels":CourseLevels,
    "Cities":Cities
}