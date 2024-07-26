import { IPost } from "../interface/IPost"
import defaultpic from "../assets/defaultuser.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faHeart, faRetweet, faShare } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faEmptyheart } from "@fortawesome/free-regular-svg-icons";
import { FC } from "react";



const PostCard:FC<IPost> =({id, content, image, like, repost, userId, userPic, userName, createdAt,} : IPost)=>{
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
    
   
 
  return(
    
    <>
    <div id={id} className="flex flex-col rounded-lg bg-neutral-400 bg-opacity-10 h-fit px-6 py-3 gap-y-1 my-5 ">
          {/*user info  */}
        <div className="flex h-fit items-center  justify-between gap-2 w-full px-2 text-white">
            <div className="flex items-center">
              <img src={userPic? userPic :defaultpic } alt={`image from ${userId}`}  className="rounded-full w-10 h-10"/>
              <p className="font-bold text-lg px-3">{userName}</p>
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
            <div className="flex w-full justify-center py-4">
            <img src={image} alt="post image" className=" aspect-square h-5/6 w-5/6" />
          </div>
          }
       
          </div>

          {/*actions buttons */}
          <div className="flex text-white text-opacity-90 px-5 gap-x-5">

             <button className="flex items-center gap-x-2">
             <FontAwesomeIcon icon={faHeart} className="text-red-600" />
             <FontAwesomeIcon icon={faEmptyheart} className="hidden" /> {/*empty heart for non liked post */}
             <p className="text-sm">{like?.length} </p>
             </button>

             <button className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faRetweet} />
              <p className="text-sm">{repost?.length}</p>
             </button>

             <button>
              <FontAwesomeIcon icon={faShare} />
             </button>

          </div>

      </div>
    </>
  )
}

export default PostCard