const Express= require('express');
const Mongoose=require('mongoose');
const BodyParser=require('body-parser');
const ExpHandleBars=require('express-handlebars');
const {languages}=require('./routes/language');
const app =Express();
app.use(BodyParser.urlencoded());
app.engine("hbs",ExpHandleBars());
app.set("view engine","hbs");
app.use(Express.json());
Mongoose.connect("mongodb://localhost:27017/lextorah").then(()=>{
////Database Connected 
console.log("connected");
}).catch((err)=>{
    ///End the application
    console.log(err);
})

app.use('/languages',languages);


app.listen(3000,()=>{console.log("listening");})