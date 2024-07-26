import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
var nameSet =[
  "attention","able","absolute","adorable","adventurous","academic","acceptable","acclaimed","accomplished",
  "accurate","aching","acidic","acrobatic","active","actual","adept","admirable","admired",
  "adorable","adored","advanced","afraid","affectionate","aged","aggravating","aggressive","agile","agitated",
  "agonizing","agreeable","ajar","alarmed","alarming","alert","alienated","alive","all","altruistic","amazing",
  "ambitious","ample","amused","amusing","anchored","ancient","angelic","angry","anguished","animated","annual",
  "another","antique","anxious","any","apprehensive","appropriate","apt","arctic","arid","aromatic","artistic",
  "ashamed","assured","astonishing","athletic","attached","attentive","attractive","austere","authentic",
  "authorized","automatic","avaricious","average","aware","awesome","awful","awkward","babyish","bad","back",
  "baggy","bare","barren","basic","beautiful","belated","beloved","beneficial","better","best","bewitched","big",
  "bighearted","biodegradable","bitesized","bitter","black"
     ];

dotenv.config({path : "../.env"})

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
    } 
    const token = jwt.sign({userId: tryUser._id},process.env.JWT_TOKEN,{expiresIn : '24h'})
    res.status(200).json({token, ...tryUser._doc} )
          
  }
 } catch(e){
  return res.status(500).json(e)
}
}


export const sign = async (req, res )=>{


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


export const oauth = async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      const { password, ...rest } = user._doc;
      return res.status(200).json({ ...rest, token });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        email,
        username: name.split(' ')[0] + nameSet[Math.floor(Math.random() * nameSet.length)] + Math.floor(Math.random() * 100),
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      const { password, ...rest } = newUser._doc;
      return res.status(201).json({ ...rest, token });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
