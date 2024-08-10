import { IPost } from "../interface/IPost"
import defaultpic from "../assets/defaultuser.png";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faComment, faFlag, faRetweet, faShare } from "@fortawesome/free-solid-svg-icons";
import {  FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updatePostSuccess , updatePostFailed ,updatePostStart} from "../redux/postSlice";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IComment } from "../interface/IComment";



const PostCard:FC<IPost> =({_id, content, image, like, repost, userId, userPic, userName, createdAt, refreshFunc } : IPost , )=>{
     const dispatch = useDispatch()
     const navigate =  useNavigate()
     const {currUser} = useSelector((state : RootState) => state.user)

    
     const [form, setForm] = useState<IComment>({
      userName :  currUser?.username,
      content: ""
    });
  
      const [likeNumber , setLikeNumber] = useState<number>(like.length)
      const [repostNumber , setRepostNumber] = useState<number>(repost.length)
      const [likeList, setLikeList] = useState<string[]>([]);
      const [repostList, setRepostList] =  useState<string[]>([]);
      const [commentId, setCommentId] =  useState<string>();
      const [limit , setLimit]= useState<string>("")
      useEffect(()=>{
        setLikeList(like)
        setRepostList(repost)  
       }, [likeList , repostList])


      if(!createdAt){
        return;
      }
      

      const calculateTime = (dateString: string) => {
        const postDate = new Date(Date.parse(dateString));
        const d = new Date();
        const diff = d.getTime() - postDate.getTime();
        const betweenTime = new Date(diff);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = betweenTime.getUTCHours();
        const minutes = betweenTime.getUTCMinutes();
        const secondes = betweenTime.getUTCSeconds();
        
        return { days, hours, minutes , secondes };
      };
      
      const newCreateAtTime = calculateTime(createdAt);
      
      interface decomposedDate {
        days : number,
        hours : number,
        minutes : number,
        secondes : number,
      }

      const determineTime = (newCreateAt :decomposedDate) =>{

        if (newCreateAt.days >= 1 ){
           return newCreateAt.days + " days"

          } else if (newCreateAt.hours >= 1 ){
            return newCreateAt.hours+ `${newCreateAt.hours == 1 ? 'hour' : "hours" }`

            }else if (newCreateAt.minutes >= 1 ){
              return newCreateAt.minutes + ' min'

              } else{
                return newCreateAt.secondes + " sec"
              }

      }
      
      function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
        const index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      }

      function addItem<T>(arr: Array<T>, value: T): Array<T> { 
        if (!arr.includes(value)){
          arr.push(value)
        }
        return arr;
      }
      
      //add / removing like or repost
      const handleUpdate = async (e : React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (!currUser){
      navigate("/login")
      } 
      let apiUrl;
      const action = e.currentTarget.id == 'like' ? 'like' : 'repost' 
      if (action == 'like'){//like action
        apiUrl = likeList.includes(`${currUser?.username}`) ?  `/api/post/updateByRemoving/${_id}`: `/api/post/update/${_id}` 
      } else{
        apiUrl = repostList.includes(`${currUser?.username}`) ? `/api/post/updateByRemoving/${_id}` :`/api/post/update/${_id}` 
      }
 
      try{
        dispatch(updatePostStart());

        const res = await fetch(apiUrl , {
          method: "PUT",
          headers:{
            "Authorization" : `Bearer ${currUser?.token}`,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({[e.currentTarget.id] : currUser?.username})
        });

        if(!res.ok){
          dispatch(updatePostFailed());
          console.error("error occured while trying to update" ,action )
        } else{
          dispatch(updatePostSuccess())
          if (!refreshFunc) return;

          if (action == 'like'){
            if (likeList.includes(`${currUser?.username}`)) {
              setLikeList(removeItem(likeList ,`${currUser?.username}` ))
              setLikeNumber(likeNumber - 1) 
            } else{
              setLikeList(addItem(likeList,`${currUser?.username}`))
              setLikeNumber(likeNumber + 1)
            } 
           
          } else{
            if (repostList.includes(`${currUser?.username}`)) {
              setRepostList(removeItem(repostList ,`${currUser?.username}` ))
              setRepostNumber(repostNumber - 1) 
            } else{
              setRepostList(addItem(repostList,`${currUser?.username}`))
              setRepostNumber(repostNumber + 1)
            } 
          }

          refreshFunc();
        }

        } catch(e){
          console.error("error occured", e)
        }
      };

      const handleComment = (e : React.MouseEvent<HTMLButtonElement>) =>{
        const {postid} = e.currentTarget.dataset
        setCommentId(postid);
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setForm({ ...form, ["_id"] :commentId , [e.currentTarget.id]: e.currentTarget.value, });
      };
     

      //add comment
      const handlePostComment = async (e : React.FormEvent) =>{
        e.preventDefault;
        
        const {_id , content , userName} = form
        if (!form) return;

        try {
          dispatch(updatePostStart());
          const res = await fetch(`api/post/update/${_id}` , {
            method: "PUT",
            headers:{
              "Authorization" : `Bearer ${currUser?.token}`,
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(form)
          });

          if (!res.ok){
            dispatch(updatePostFailed());
            console.error("error occured while trying to post the comment, try later");
          }
          else{
            dispatch(updatePostSuccess())
            const data = res.json();
            console.log(data)
          }
         
        } catch(error){
          console.log(error);
          throw new Error;
        }

        return;
      }
     const displayShareLink = () =>{
      return;
     }

     


  return(
    
    <>
    <div id={_id} className="flex flex-col rounded-lg bg-neutral-400 bg-opacity-10 h-fit px-6 py-3 gap-y-1 my-5 ">
          {/*user info  */}
        <div className="flex h-fit items-center  justify-between gap-2 w-full px-2 text-white">
            <div className="flex items-center">
              <img src={userPic? userPic : defaultpic } alt={`image from ${userId}`}  className="rounded-full w-10 h-10"/>
              <p className="text-lg px-3 text-white capitalize hover:underline">{userName}</p>
            </div>

            <div className="flex items-center">
            <FontAwesomeIcon icon={faFlag}  className="hover:text-red-600"/> {/*report the post */}
            </div>
          </div>

          {/*content  */}
          <div className="flex flex-col text-white text-opacity-90 px-5 -mt-3 pb-3">
            <p className="text-end text-[.7rem] text-neutral-400 py-1">{determineTime(newCreateAtTime) } ago</p>
            <p className="text-sm">{content}</p>
          { image &&
            <div className="flex justify-center py-4">
            <img src={image} alt="post image" className="object-cover w-full p-10" />
          </div> 
          }
       
          </div>

          {/*actions buttons */}
          <div className="flex text-white text-opacity-90 px-5 gap-x-4">


          <div className="flex items-center gap-x-2"  >
              <button id="comment" data-postid={_id}  onClick={handleComment}>
                <FontAwesomeIcon id='repost' icon={faComment} className=" hover:scale-150 hover:text-yellow-500 hover:-rotate-12 transition-all" />
              </button>
              <p className="text-sm -ms-1">{repostNumber}</p>
             </div>


             <div className="flex items-center">
               <div id='like' className={`heart ${likeList.includes(`${currUser?.username}`) ? "animate-like-anim bg-right" : "bg-left" } hover:bg-right hover:scale-150 transition-transform`} onClick={handleUpdate}/> 
               <p className="text-sm -ms-3">{likeNumber}</p>
             </div>

             <div className="flex items-center gap-x-2">
              <button id="repost"  onClick={handleUpdate}>
                <FontAwesomeIcon id='repost' icon={faRetweet} className={`${repostList.includes(`${currUser?.username}`) && "text-sky-500 animate-bam"} hover:scale-150 hover:text-sky-500 hover:rotate-12 transition-all`} />
              </button>
              <p className="text-sm -ms-1">{repostNumber}</p>
             </div>

             <button onClick={displayShareLink}>
              <FontAwesomeIcon icon={faShare} onClick={displayShareLink}/>
             </button>

          </div>

          { commentId == _id && 
          <form onSubmit={handlePostComment} className="flex flex-col gap-3 text-white text-opacity-90 px-5 gap-x-4">
             <textarea maxLength={140} minLength={1} onChange={handleChange} name="content" id="content" className="w-full bg-neutral-500 bg-opacity-30 rounded-lg py-2 px-2 text-white placeholder:text-sm" placeholder="What's happening ?"/>      
             <button 
               type="submit" 
               className="relative text-black bg-fluo font-pixelify w-fit px-3 rounded transition-all 
                       opacity-60 cursor-not-allowed hover:bg-blue-900 hover:text-white justify-self-end" >
                   bam it
                </button>  
          </form> }

      </div>
    </>
  )
}

export default PostCard