import Post from "../models/post.models.js"



export const getPost =async (req, res )=>{
  try{
    const allPost = await Post.find()
    if (!allPost) {
     return res.status(400).json({error: e})
    }
    return res.status(200).json(allPost)
  
  } catch(e){
    return res.status(500).json({error: e})
  }
}


export const getPostById = async(req, res)=>{ 
  const id = req.params
  try{
    const postById = await Post.findOne({id})
    if(!postById){
      return res.status(400).json({error: e})
    }
     return res.status(200).json({post: id })
  } catch(e){
    return res.status(500).json({error: e})
  }
}

export const createPost = async (req, res)=>{
  try {
    const newPost = await new Post({ ...req.body })
    await newPost.save()
    .then(()=>res.status(201).json({postCreated: newPost }))
    .catch((e)=>res.status(401).json(e))

  } catch(e){
    return res.status(500).json({error: e})
  }
}


export const putPost = async (req, res)=>{
  const id = req.params
  try{
    const postById = await Post.findOneAndUpdate({id} , {...req.body})
    if(!postById){
      return res.status(400).json({error: e})
    }
  } catch(e){
    return res.status(500).json({error: e})
  }
}


export const deletePost = async (req, res)=>{
  const id = req.params
  try{
    const postById = await Post.findOneAndDelete({id})
    if(!postById){
      return res.status(400).json({error: e})
    }
  } catch(e){
    return res.status(500).json({error: e})
  }
}
