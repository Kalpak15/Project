const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
   title: {type : String,required:true},
   description:String,
   credits:Number,
   
});

module.exports=mongoose.model("Course",CourseSchema)
