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
        content: "",
        userName: currUser?.username ,
        commentForId: _id,
        userId: currUser?._id,
        userPic: currUser?.profilpicture ? currUser.profilpicture : defaultpic
      });
  
      //post info
      const [likeNumber , setLikeNumber] = useState<number>(like.length)
      const [repostNumber , setRepostNumber] = useState<number>(repost.length)
      const [likeList, setLikeList] = useState<string[]>([]);
      const [repostList, setRepostList] =  useState<string[]>([]);
      const [commentId, setCommentId] =  useState<string>();
      
     //comment info



      const [limit , setLimit]= useState<number>(0)
      const [commentList, setCommentList] = useState<IComment[]>([]);


      useEffect(()=>{
        setLikeList(like)
        setRepostList(repost)  
        getCommentPerPost();

       }, [likeList , repostList])


      if(!createdAt){
        return;
      }
      

      const calculateTime = (dateString: string) : object=> {
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

      const determineTime = (newCreateAt :decomposedDate): string =>{

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
      const action = e.currentTarget.id
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

          refreshFunc && refreshFunc();
        }

        } catch(e){
          console.error("error occured", e)
        }
      };

       //get  the current post's id
      const handleComment = (e : React.MouseEvent<HTMLButtonElement>):void =>{
        const {postid} = e.currentTarget.dataset
        setCommentId(postid);
      }

      //track the text area for the comment section
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
        setForm({ ...form, [e.currentTarget.id]: e.currentTarget.value });
        setLimit(e.currentTarget.value.length);  
        };
     
      //add comment
      const handlePostComment = async (e : React.FormEvent) =>{
        e.preventDefault;
        if( form.content.length > 140 || form.content.length < 0 || !form.content || !form.commentForId || !form.userName) return; // prevent empty form or not completed
      
        try{
         const res = await fetch("/api/comment/create", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${currUser?.token}`
          },
          body: JSON.stringify(form)
        });
         if (!res.ok){
          console.error('error occured while trying to create the comment');
         } else{
          console.log("the post has been created");
         }
         if (!refreshFunc) return;
         refreshFunc();
        }catch(e){
          console.error(e)
        }
      }

      //get every commment for each post
      const getCommentPerPost = async () =>{
        try{
         const res = await fetch(`/api/comment/getCommentPerPost/${form.commentForId }`);
         if (!res.ok){
          console.error('error occured while trying to get the comment');
         } else{
          const data: IComment[] = await res.json();
          setCommentList(data);
          console.log(data);
         }

         //refresh the page
         refreshFunc && refreshFunc();

        }catch(e){
          console.error(e)
        }
      }

      //get comment by id
      const getCommentById = async (id : string) =>{
        try{
         const res = await fetch(`/api/comment/getCommentById/${id}`);
         if (!res.ok){
          console.error('error occured while trying to get the comment');
          return;
         } else{
          const data = await res.json();

          return data;
         }

        } catch(e){
          console.error(e)
        }
      }

    //like or repost comment
      const updatePostComment = async (action: string ,id : string) =>{

       let apiUrl : string = "";
       const comment =  await getCommentById(id)

       if (comment){

    const hasLiked = comment[action]?.includes(currUser?.username);
    const apiUrl = hasLiked
      ? `/api/comment/remove/${id}`
      : `/api/comment/update/${id}`;
    const actionType = hasLiked ? "removing" : "updating";

        try{
         const res = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${currUser?.token}`
          },
          body: JSON.stringify({action: currUser?.username})
        });

         if (!res.ok){
          console.error('error occured while trying to',actionType,'the comment');
         } else{
          console.log("the post has been", actionType);
          refreshFunc && refreshFunc();
         }


        }catch(e){
          console.error(e)
        }

      }
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
              <p className="text-sm -ms-1">{commentList.length}</p>
             </div>

          {/*like */}
             <div className="flex items-center">
               <div id='like' className={`heart ${likeList.includes(`${currUser?.username}`) ? "animate-like-anim bg-right" : "bg-left" } hover:bg-right hover:scale-150 transition-transform`} onClick={handleUpdate}/> 
               <p className="text-sm -ms-3">{likeNumber}</p>
             </div>

          {/*repost */}
             <div className="flex items-center gap-x-2">
              <button id="repost"  onClick={handleUpdate}>
                <FontAwesomeIcon id='repost' icon={faRetweet} className={`${repostList.includes(`${currUser?.username}`) && "text-sky-500 animate-bam"} hover:scale-150 hover:text-sky-500 hover:rotate-12 transition-all`} />
              </button>
              <p className="text-sm -ms-1">{repostNumber}</p>
             </div>

          {/*share */}
             <button onClick={displayShareLink}>
              <FontAwesomeIcon icon={faShare} onClick={displayShareLink}/>
             </button>

          </div>

          { commentId == _id && 
          <div>
          <form onSubmit={handlePostComment} className="flex flex-col gap-3 text-white text-opacity-90 px-5 gap-x-4">
             <textarea maxLength={140} minLength={1} onChange={handleChange} name="content" id="content" className="w-full bg-neutral-500 bg-opacity-30 rounded-lg py-2 px-2 text-white placeholder:text-sm" placeholder="What's happening ?"/>   
             <div className="flex justify-between">
             <button 
               type="submit" 
               className={`relative text-black bg-fluo font-pixelify w-fit px-3 rounded transition-all 
                      ${limit === 0 ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-900 hover:text-white"}    justify-self-end`} disabled={limit === 0}>
                   bam it
                </button>  
               <p className={`${limit > 135 && 'text-red-700'}`}>{limit} / 140 characters remaining</p>
              </div>   
          </form>
          
          <div className="py-5 flex flex-col gap-4 text-white">
            {commentList && commentList.map((comment : IComment , index:number)=>(
              <div key={index} className="flex flex-col gap-2 border border-white rounded-xl p-2 bg-slate-100 bg-opacity-10">
        
            <div className="flex  justify-between pe-5">
              <div className="flex items-center gap-2">
                    <img src={userPic? userPic : defaultpic } alt={`image from ${userId}`} className="rounded-full w-7 h-7"/>
                    <p className=" text-sm text-opacity-30 font-thin">from <span className="capitalize text-opacity-100 font-bold hover:text-fluo transition-all hover:cursor-pointer">{comment.userName}</span></p>
                  </div>
                  
                <div>
                 <p className="text-end text-[.7rem] text-neutral-400 py-1">{determineTime(calculateTime(comment.createdAt)) } ago</p>
                </div>
            </div>
   

                <p className="ps-8">{comment.content}</p>

                <div className="flex gap-2 ps-4 -mt-2">
                  <div className="flex items-center">
                    <div id='like' className={`heart ${comment.like?.includes(`${currUser?.username}`) ? "animate-like-anim bg-right" : "bg-left" } hover:bg-right hover:scale-150 transition-transform`} onClick={()=>updatePostComment('like',comment._id)}/> 
                    <p className="text-sm -ms-3">{comment.like?.length}</p>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <button id="repost"  onClick={(()=> updatePostComment('repost',comment._id))}>
                      <FontAwesomeIcon id='repost' icon={faRetweet} className={`${comment.repost?.includes(`${currUser?.username}`) && "text-sky-500 animate-bam"} hover:scale-150 hover:text-sky-500 hover:rotate-12 transition-all`} />
                    </button>
                    <p className="text-sm -ms-1">{comment.repost?.length}</p>
                  </div>
                </div>
     
              </div>

              

            )).reverse()}
          </div>

          </div>
          }

      </div>
    </>
  )
}

export default PostCard