import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique : true
  },
  username:{
    type: String,
    required: true,
    unique : true
  },
  password:{
    type: String,
    required: true
  } ,


}  ,{timestamps: true})

const User = mongoose.model('user' , userSchema)
export default User