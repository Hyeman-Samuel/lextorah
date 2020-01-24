const Express= require('express');
const Mongoose=require('mongoose');
const BodyParser=require('body-parser');
const ExpHandleBars=require('express-handlebars');
const {languages}=require("./controllers/routes/language");
const {cities}=require("./controllers/routes/city");
const {course}=require("./controllers/routes/course");
const {courseLevels}=require("./controllers/routes/courseLevel");
const {courseTypes}=require("./controllers/routes/courseType");
const {enroll}=require("./controllers/routes/Enroll");
const app =Express();
const path =require("path");
app.use(BodyParser.urlencoded());
app.engine("hbs",ExpHandleBars());
app.set("view engine","hbs");
app.use(Express.json());
app.use("/public",Express.static("public"));
Mongoose.connect("mongodb://localhost:27017/lextorah").then(()=>{
////Database Connected 
console.log("connected");
}).catch((err)=>{
    ///End the application
    console.log(err);
})

app.use('/language',languages);
app.use('/city',cities);
app.use('/courselevel',courseLevels);
app.use('/course',course);
app.use('/coursetype',courseTypes);
app.use('/enroll',enroll);


app.listen(3000,()=>{console.log("listening");})