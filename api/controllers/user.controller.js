import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const login = async (req, res , next)=>{
 const { id } = req.params
 try{
  const tryUser = await User.findOne({email :req.body.email})
  if (!tryUser ){
    return res.status(400).json({message:"the user doesn't exist or the email or password is incorrect"})
  } else {
    const tryUserPassword = await bcryptjs.compareSync(req.body.password , tryUser.password )
    if (!tryUserPassword){
      return res.status(400).json({message:"the user doesn't exist or the email or password is incorrect"})
    } else {
      res.status(200).json(tryUser)
      return tryUser
    }
  }
 } catch(e){
  return res.status(500).json(e)
}
}


export const sign = async (req, res , next)=>{


  try{

    const hash = await bcryptjs.hash(req.body.password , 16)

    const newUser = new User({
      ...req.body ,
       password: hash})

   await newUser.save();
   res.status(201).json({message:"user created"})
  }
  catch(e){
    return res.status(500).json(e)
  }
}

export const google = async (req, res ,next)=>{

}