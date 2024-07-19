import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config({path:'../.env'})


export const verifyToken  = ( req, res ,next)=>{
  try{
    const token = res.authorization.headers.split(' ')[1]
    const decodedToken =  jwt.verify(token,process.env.JWT_TOKEN)
    req.user = decodedToken;
    res.status(200).json(req.user)
  next()
  } catch(e){
    res.status(401).json({e})
  }
}
