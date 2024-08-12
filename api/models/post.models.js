import mongoose from "mongoose";


const postSchema =  mongoose.Schema({
  content : {
  type: String,
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
    type : String ,
  },
  userId:{
    type: String
  },
  userPic:{
    type:String
  },
  userName:{
    type:String,
  },

},
 {
  timestamps : true
})

const Post = mongoose.model("post",postSchema)
export default Post; 