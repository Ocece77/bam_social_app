import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({path:'../.env'})


export const verifyToken  = ( req, res ,next)=>{
  try{
    if (!req.headers){
      return res.status(401).json("no authorization header");
    } 
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decodedToken = jwt.verify(token , process.env.JWT_TOKEN)
    req.user = decodedToken;
    next();
  } catch(e){
    res.status(500).json(e)
  }
}
