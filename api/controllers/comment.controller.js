import Comment from "../models/comment.model.js"

export const getCommentPerPost = async ( req ,res )=>{
  const {id} = req.params
   try{
     const findComment = await Comment.find({commentForId :id})
     if (!findComment){
      return res.status(401).json({message: "error occured while searching for the comments associated with the post's id of", id})
     }else{
      return res.status(201).json(findComment)
     }
   } catch(e){
    return res.status(500).json({error :e})
  }
} 

export const getCommentById = async ( req ,res )=>{
  const { id } = req.params
  try{
    const findCommentById = await Comment.findById(id);

    if (!findCommentById){
     return res.status(401).json({message: "error occured while searching for the comment with the id of", id})
    }else{
     return res.status(201).json(findCommentById)
    }
  } catch(e){
    return res.status(500).json({error :e})
  }
} 

export const postComment = async ( req ,res )=>{
  try{
    const newComment = new Comment({
      ...req.body
    })
    await newComment.save();
    if (!newComment){
     return res.status(400).json({message : "comment hasn't been created "})
    }else{
     return res.status(200).json({message : "comment has been created"})
    }
  } catch(e){
   return res.status(500).json({error :e})

  }
} 

export const updateComment = async ( req ,res )=>{
  const { id } = req.params
  try{
    const updateComment = await Comment.updateOne(
      {_id : id} ,
      {$push : req.body}
    )

    if (!updateComment){
     return res.status(401).json({message : "comment can't be updated"})
    }else{
     return res.status(201).json({message : "comment has been updated"})
    }
  } catch(e){
   return res.status(500).json({error :e})
  }
} 

export const updateCommentByRemoving = async ( req ,res )=>{
  const { id } = req.params
  try{
    const updateComment = await Comment.updateOne(
      {_id : id} ,
      {$pull : req.body}
    )

    if (!updateComment){
     return res.status(401).json({message : "comment can't be updated"})
    }else{
     return res.status(201).json({message : "comment has been updated"})
    }
  } catch(e){
   return res.status(500).json({error :e})
  }
} 


export const deleteComment = async ( req ,res )=>{
  const {id} = req.params

  try{
    const deleteComment =await Comment.delete({id } )

    if (!deleteComment){
     return res.status(401).json({message : "comment can't be deleted"})
    }else{
     return res.status(201).json({message : "comment has been deleted"})
    }
  } catch(e){
   return res.status(500).json({error :e})
  }
} 