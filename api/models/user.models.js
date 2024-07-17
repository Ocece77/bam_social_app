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
  profilpicture :{
    type: String, 
    default : null
  },
  bgpicture :{
    type: String, 
    default : null
  },
  description:{
    type: String,
    default : "Hi everyone ! Chat with together and have fun!✨"
  },
  followers:{
    type : Array ,
    default : []
  },
  following:{
    type : Array ,
    default : []
  }
}  ,{timestamps: true})

const User = mongoose.model('user' , userSchema)
export default User