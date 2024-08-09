import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import defaultbg from "../assets/defaultbg.jpeg";
import defaultpic from "../assets/defaultuser.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { fetchingPostFailed, fetchingPostStart, fetchingPostSuccess } from "../redux/postSlice";
import { useDispatch } from "react-redux";
import { IPost } from "../interface/IPost";
import PostCard from "../components/PostCard";




const Profil: React.FC =()=>{
  const { currUser } = useSelector((state: RootState) => state.user);
  const currPostState = useSelector((state: RootState) => state.post);
  
  useEffect(() => {
    if (!currUser) return;
    getPost()
 
  }, []);

  
  const dispatch = useDispatch();
  const [data, setData] = useState<IPost[]>();
  const [selectedFilter , setSelectedFilter] = useState<string>("bams");
  const [filteredList, setFilteredList] =useState<IPost[]>();
  const [controller, setController] = useState<AbortController | null>(null);

  if (!currUser?.createdAt) return;
  const createdAtParse  = new Date(currUser?.createdAt.toString().slice(0,10));

  // Call the API
  const getPost = async (signal: AbortSignal) => {
    try {
      dispatch(fetchingPostStart());
      const res = await fetch("/api/post/get", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${currUser?.token}`,
          "Content-Type": "application/json"
        },
      });
      if (!res.ok) {
        dispatch(fetchingPostFailed());
      }
      const resData = await res.json();
      setData(resData)
      setFilteredList(resData.filter((obj)=> obj.userName == currUser?.username).reverse())
      dispatch(fetchingPostSuccess());
    } catch (e) {
      console.error(e);
    }
  };

  const refreshFunc = () : void => {
    if (controller) {
      controller.abort();
      const newController = new AbortController();
      setController(newController);
      getPost(newController.signal);
    }
  };
 
  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>)=>{
   const { id } = e.currentTarget;
   setSelectedFilter(id);
   if (!data) return;
   switch(id){
    case 'bams':
      setFilteredList(data.filter((obj)=> obj.userName == currUser?.username).reverse());
      break;
    case 'replies':
      setFilteredList(data.filter((obj)=> obj.like.filter((user) => user == currUser?.username).length != 0 ));
      break;// to cr
    case 'media':
        setFilteredList(data.filter((obj)=> obj.userName == currUser?.username && obj.image).reverse());
       break;
    case 'likes':
        setFilteredList(data.filter((obj)=> obj.like.filter((user) => user == currUser?.username).length != 0 ));
        console.log(filteredList)
       break;
   }
  }



  return(
    <>
     <div className=" w-full grid grid-cols-5">  

       <div className="col-span-1"> </div>{/*empty div */}

        <div className="col-span-full md:col-span-4 relative rounded-xl ">
            <div className=" border border-t-transparent  pb-10">
                  <div className="rounded-lg ">
                        <img src={currUser?.bgpicture ? currUser.bgpicture : defaultbg} alt="defaultbg" className="w-full object-cover h-56 rounded-t-lg"/>
                      </div>

                      <div className="-mt-20 w-full flex ps-12 ">
                        <img className="rounded-full w-36 h-36 border-4 border-white" src={currUser?.profilpicture ?currUser?.profilpicture   :defaultpic } alt="" />
                      </div>

                      <div className="ps-20 mt-3 text-white ">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between">
                          <p className="text-[2rem] capitalize font-bold ">{currUser?.username}</p>
                          <button className="me-10 rounded-xl p-2 border border-fluo text-fluo hover:border-blkblue hover:text-blkblue hover:bg-fluo capitalize font-bold transition-all">edit profil</button>
                          </div>
                          <p className="text-sm capitalize font-light text-gray-400 -mt-2">@{currUser?.username}</p>
                          <p className="text-lg  ">{currUser?.description}</p>
                          <p> <FontAwesomeIcon icon={faCalendarDays} className="text-fluo" /> Joined  {createdAtParse.toUTCString().slice( 7,16)}</p>
                          <div className="grid grid-cols-2 w-1/3 ">
                              <p className="text-gray-400"><span className="font-bold text-white">{currUser?.followers}</span> Followers</p>
                              <p className="text-gray-400"><span className="font-bold text-white"> {currUser?.following}</span> Following</p>
                          </div>   
                        </div>
                      </div>

                      <div className= "text-white px-10 mt-3 font-bold flex  justify-around ">
                            <button id='bams' className={`${selectedFilter == "bams" && "text-fluo font-semibold"}hover:text-fluo hover:transition all`} onClick={handleFilter}>Bams</button>
                            <button id='replies' className={`${selectedFilter == "replies" && "text-fluo font-semibold"}hover:text-fluo hover:transition all`} onClick={handleFilter}  >Bams & replies</button>
                            <button id='media' className={`${selectedFilter == "media" && "text-fluo font-semibold"}hover:text-fluo hover:transition all`} onClick={handleFilter}>Media</button>
                            <button id='likes' className={`${selectedFilter == "likes" && "text-fluo font-semibold"}hover:text-fluo hover:transition all`} onClick={handleFilter}>Likes</button>
                        </div>
            </div>
   

            <div className="flex flex-col w-full">
          {filteredList &&
          filteredList.map((post :IPost , index :number) =>(
            <PostCard key={index} _id={post._id}
              content ={post.content}
              image={post.image}
              like={post.like}
              userName={post.userName}
              repost={post.repost}
              userId={post.userId}
              userPic={post.userPic}
              createdAt={post.createdAt}
              refreshFunc={refreshFunc}
             />
          ))
       }

       {filteredList && filteredList.length == 0 &&!currPostState.loading &&
        <div className='flex space-x-1 justify-center items-center pt-10'>
          <span className='sr-only '>no post one the page</span>
          <p className="text-white text-xl"> There's no post 😭</p>
        </div>
        }
          </div>
 


        </div>

     

    </div>
    </>
  )
}

export default Profil;