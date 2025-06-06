const mongoose=require('mongoose')

const StudentSchema = new mongoose.Schema({
   name: {type : String,required:true},
   email:{type:String,required:true,unique:true},
   age:Number,
   profilePicture: {
    type: String, // Stores file path or URL
    trim: true, // Optional field
  },
   department:String,
   admissionDate:{type: Date,default:Date.now},
   enrolledCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}]
})

module.exports=mongoose.model("Student",StudentSchema)
