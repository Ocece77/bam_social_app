import { IPost } from "../interface/IPost"
import defaultpic from "../assets/defaultuser.png";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faFlag, faRetweet, faShare } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";



const PostCard:FC<IPost> =({_id, content, image, like, repost, userId, userPic, userName, createdAt,} : IPost)=>{
      
      interface postData {
        like? : [],
        repost? : []
      }
      const [data ,setData] = useState<postData>()
      const {currUser} = useSelector((state : RootState) => state.user)
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
    
     const handleUpdate = async (e : React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
       //animation
        e.currentTarget.classList.toggle("animate-like-anim")
        e.currentTarget.classList.toggle("bg-right")
        e.currentTarget.classList.toggle("bg-left")

       setData({ [e.currentTarget.id] : [currUser?.username] }) 
    
      try{
        const res = await fetch(`/api/post/update/${_id}` ,{
          method: 'POST', 
          headers : {
            "Authorization" : `Bearer ${currUser?.token}`,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        if (!res.ok){
          console.error('action failed' )
        } else{
          return;
        }
      } catch(e){
        throw new Error 
      }
     } 


     const isLiked = like?.filter((userLiking)=> userLiking == currUser?.username).length != 0
     const isReposted = repost?.filter((userReposting)=> userReposting == currUser?.username).length != 0

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
            <img src={image} alt="post image" className="object-cover  w-full p-10" />
          </div> 
          }
       
          </div>

          {/*actions buttons */}
          <div className="flex text-white text-opacity-90 px-5 gap-x-4">


             <div className="flex items-center ">
               <div id='like' className={`heart ${isLiked ? "bg-right" : "bg-left"}`} onClick={handleUpdate}/> 
              <p className="text-sm -ms-3">{like?.length}</p>
             </div>

             <div className="flex items-center gap-x-2"  >
              <button onClick={handleUpdate}>
                <FontAwesomeIcon id='repost' icon={faRetweet} />
              </button>
              <p className="text-sm  -ms-1">{repost?.length}</p>
             </div>

             <button>
              <FontAwesomeIcon icon={faShare} onClick={displayShareLink}/>
             </button>

          </div>

      </div>
    </>
  )
}

export default PostCard