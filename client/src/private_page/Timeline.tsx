import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import defaultpic from "../assets/defaultuser.png";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import PostCard from "../components/PostCard";
import { useDispatch } from "react-redux";
import { createPostFailed, createPostStart, createPostSuccess, fetchingPostFailed, fetchingPostStart, fetchingPostSuccess } from "../redux/postSlice";
import { IPost } from "../interface/IPost";


const Timeline: React.FC =()=>{
  
  const {currUser} = useSelector((state : RootState) => state.user)
  const currPostState =  useSelector((state : RootState) => state.post)

  interface postForm {
    content : string,
    image?: File | null ,
    userId : string, 
    userPic? : string ,
    userName: string,
  }
  
  const dispatch = useDispatch()// interact with the redux store
  const [limit, setLimit] = useState<number>(140)//char limit
  const [postList, setPostList] = useState<Array<IPost>>([]);//lisdt of the post
  const [form, setForm] = useState<postForm>({
    content: "",
    userId: currUser ? currUser._id : "", 
    userPic: currUser?.profilpicture ? currUser.profilpicture  : "/src/assets/defaultuser.png",
    userName: currUser ? currUser.username : "",
  });


  const TextArea = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCharLimit =()=>{
    if (TextArea.current) {
      setLimit(140 - TextArea.current.value.length)
    }
  }

  const controller = new AbortController();
  //call the api at every update
  useEffect(()=>{
    if (!currUser) return;
    getPost(controller.signal);
    
    return()=>{
      controller.abort()
    }
  }, [currUser])

  
  //change the style of the file input element and the content
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //call the api
  const getPost = async(signal : AbortSignal)=>{
    
     try{
      dispatch(fetchingPostStart())
       const res = await fetch("/api/post/get" ,{
        method: "GET",
        headers: {
          "Authorization": `Bearer ${currUser?.token}`,
          "Content-Type": "application/json"
        },
        signal 
       })
       if (!res.ok){
        dispatch(fetchingPostFailed())
       }
       const data =await res.json();
       setPostList(data.reverse());
       dispatch(fetchingPostSuccess())
 
     } catch(e){
       return e;
     }
  }

//get the content of the form
 const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> )=>{
  setForm({...form , [e.currentTarget.id] :  e.currentTarget.value})
  handleCharLimit()
 }

 if (!currUser) return null; //bc the user can be null 

//create the post
  const createPost = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if (!form.content || form.content.length > 140 ) return;

    try{
      dispatch(createPostStart())
      const res = await fetch("/api/post/create", {
        method : "POST",
        headers : {
          'Content-Type':'application/json',
          "Authorization" :`Bearer ${currUser.token}`
        },
        "body" : JSON.stringify(form)
      });

      if (!res.ok){
        dispatch(createPostFailed())
      } else {
       dispatch(createPostSuccess())
       getPost(controller.signal);
      }

    }catch(e){
      console.error(e)
    }
    
};





  return(
    <>
     <div className="flex flex-col gap-2 ps-0 md:ps-40 lg:ps-24">
      {/*post form */}
      <div>
        <div className="flex rounded-lg bg-neutral-400 bg-opacity-10 h-1/6 px-6 py-3 ">
          <div className="flex items-center h-full justify-center">
           <img
            src={currUser.profilpicture ? currUser.profilpicture : defaultpic}  alt="userpicture"  className="w-16 md:w-16 rounded-full border border-fluo p-1 mb-4"/>
          </div>

          <form onSubmit={createPost} className="flex flex-col gap-2 w-full ps-5">
              <textarea ref={TextArea} maxLength={140} minLength={1} onChange={handleChange}  name="content" id="content" className="w-full bg-neutral-500 bg-opacity-30 rounded-lg py-2 px-2 text-white placeholder:text-sm" placeholder="What's happening ?"/>      
               
              <div className="flex justify-between">
                <div className="flex items-center" >
                  <FontAwesomeIcon icon={faImage} style={{color: "#ffffff",}} />
                  <div className="flex items-center">
                      <input onChange={handleChange} type="file"ref={fileInputRef}   className="hidden"/>
                      <button onClick={handleClick} className="text-white text-[.7rem] px-1 font-bold hover:text-fluo transition-all" >
                        Choisir un fichier
                      </button>
                    </div>    
                  </div>

                <div className="flex justify-end pe-3 items-center">
                    {limit != 140 && <p className="text-red-700 text-[.8rem] animate-fade pe-5">{limit} remaining characters </p>}
                    <button type="submit" className={`bg-fluo font-pixelify w-fit px-3 rounded  transition-all ${limit == 140 ? " hover:bg-none hover:text-none opacity-60 cursor-not-allowed" : "hover:bg-blue-900 hover:text-white" }`} disabled={limit == 140 || currPostState.loading ? true : false}> bam it </button>
                </div>
              </div>
            </form>
        </div>
      </div>

       {/*post list */}

      <div>
        {/*loading animation */}
      {currPostState.loading && 
                    <div className='flex space-x-1 justify-center items-center pt-10'>
                        <span className='sr-only '>Loading...</span>
                        <p className="font-pixelify text-2xl text-white">loading</p>
                        <div className='h-3 w-3 bg-white text-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-3 w-3 bg-white text-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                       <div className='h-3 w-3 bg-white text-white rounded-full animate-bounce'></div>
                    </div>
                    }
                    
       {postList &&
          postList.map((post :IPost , index :number) =>(
            <PostCard key={index} id ={post.id}
              content ={post.content}
              image={post.image}
              like={post.like}
              repost={post.repost}
              userId={post.userId}
              userPic={post.userPic}
              createdAt={post.createdAt}/>
          ))
       }

      </div>


     </div>
    </>
  )
}

export default Timeline