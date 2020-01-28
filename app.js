//importing fundamental requirements
const Express= require('express');
const Mongoose=require('mongoose');
const BodyParser=require('body-parser');
const ExpHandleBars=require('express-handlebars');
const path =require("path");

//Route Handlers for languages,cities,course name , level and type and enroll;
const {languages}=require('./routes/language');
const {cities}=require('./routes/city');
const {course}=require('./routes/course');
const {courseLevels}=require('./routes/courseLevel');
const {courseTypes}=require('./routes/courseType');
const {enroll}=require('./controllers/enroll');
const admin = require("./routes/admin")

// initiating express
const app =Express();

//configuration
app.engine("hbs",ExpHandleBars());

//setting up middlewares
app.use(BodyParser.urlencoded({ extended : false}));
app.use(BodyParser.json());
app.set("view engine","hbs");
app.set("port",process.env.port || 3000)
app.use(Express.json());
app.use("/public",Express.static(path.join(__dirname,"public")));

//db connect
Mongoose.connect("mongodb://localhost:27017/lextorah").then(()=>{
////Database Connected 
console.log("connected to mongodb");
}).catch((err)=>{
    ///End the application
    console.log(err);
})

//routes

app.use("/admin",admin);
app.use('/language',languages);
app.use('/city',cities);
app.use('/courselevel',courseLevels);
app.use('/course',course);
app.use('/coursetype',courseTypes);
app.use('/enroll',enroll);


app.listen(app.get("port"),()=>{console.log("listening");})