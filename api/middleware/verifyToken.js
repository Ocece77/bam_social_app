import jwt from 'jsonwebtoken'


export const verifyToken  = async( req, res ,next)=>{
  try{
  const token =  res.authorization.headers.split(' ')[1]
  const decodedToken =  jwt.verify(token,process.env.JWT_TOKEN)
  req.auth = {
    userId: userId
  };
  next()
  } catch(e){
    res.status(401).json({e})
  }
}