import mongoose from "mongoose";


const postSchema =  mongoose.Schema({
  content : {
  type: String,
  required : true
  },
  image:{
    type:String,
  },
  like:{
    type : Array ,
    default : []
  },
  repost:{
    type : Array ,
    default : []
  },
  share:{
    type : Array ,
    default : []
  },
  userId:{
    type: String
  },
  userPic:{
    type:String
  },
  userName:{
    type:String,
  }
},
 {
  timestamps : true
})

const Post = mongoose.model("post",postSchema)
export default Post; 