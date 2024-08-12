import mongoose from "mongoose";


const commentSchema =  mongoose.Schema({
  content :{
    type:String,
    required :true
  },
  userName :{
    type:String,
    required :true
  },
  like:{
    type : Array ,
    default : []
  },
  repost:{
    type : Array ,
    default : []
  },
  commentForId:{
    type:String,
    required :true
  },
  userId:{
    type: String
  },
  userPic:{
    type:String
  },

}, {
  timestamps: true
})


const Comment = mongoose.model("comment", commentSchema)
export default Comment