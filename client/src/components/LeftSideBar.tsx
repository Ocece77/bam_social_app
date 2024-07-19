import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../redux/store"
import defaultpic from "../assets/defaultuser.png";
import defaultbg from "../assets/defaultbg.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faGear, faHouse, faInbox, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { NavContext } from "../utils/context/Context";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/userSlice";

const LeftSidebar: React.FC =()=>{

  const dispatch = useDispatch()
  const {currUser} = useSelector((state: RootState ) => state.user)
  const context = useContext(NavContext)
  
  if (!currUser) {
    return null; // ou une autre interface utilisateur si l'utilisateur n'est pas connecté
  }
  if(!context){
   throw new Error("There's no context")
  }

  const { open,isOpen} = context;


  const logOut = () => {
    dispatch(logoutSuccess())
   }
  return(
    <>
    <div className={`${open? "w-full":"-translate-x-96"} md:translate-x-0 transition-all fixed top-0 bottom-0 md:left-16 md:top-24 md:bottom-5 rounded-lg md:w-1/3 lg:w-1/4`}>

      <div className="flex flex-col gap-y-5 h-full rounded-lg bg-blkblue  bg-opacity-5md:bg-transparent">

         {/*user info */}
        <div className=" h-fit relative py-5 border-fluo md:border border-opacity-15 md:bg-neutral-400 md:bg-opacity-10 md:rounded-lg overflow-hidden ">

          <div className="absolute h-[7.6rem] md:h-20 top-0 overflow-hidden w-full ">
            <img src={currUser.bgpicture ? currUser.bgpicture : defaultbg} alt="defaultbg" className="w-full "/>
          </div>

          <FontAwesomeIcon onClick={()=> isOpen(false)}className="block md:hidden absolute w-fit right-2 top-2 hover:rotate-180 transition-all" size="xl" icon={faXmark} style={{color: "#0e0f19"}} />

         <div className="relative flex flex-col items-center z-40">
        
           <img src={currUser.profilpicture ? currUser.profilpicture : defaultpic} alt="userpicture" className="w-28 md:w-24 rounded-full border border-fluo p-1 mb-4"/>

            {/*profil info // username */}
            <div className="flex flex-col gap-1 items-center ">
              <p className=" bg-fluo rounded px-2 py-1 font-pixelify font-bold  text-lg" >@{currUser.username}</p>
              <p className="text-white font-thin text-sm mt-1">{currUser.description}</p>
              <Link to="/dashboard?tab=profil" className="font-bold text-white hover:text-fluo transition duration-200 text-sm">See your page</Link>
            </div>
  
            {/*follower and following */}
            <div className="text-white flex gap-12 mt-7 border-t border-fluo border-opacity-20 pt-4">

              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-light">Followers</p>
              </div>
      
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">0</p>
                <p className="text-light">Following</p>
              </div>
            </div>

            {/*nav for sm screen */}
            <div className="font-semibold flex flex-col gap-5 pt-20  w-1/2 md:hidden ">
              <Link onClick={()=> isOpen(false)} className="bg-white text-blkblue hover:bg-fluo hover:text-black ps-2  py-2 rounded-lg transition-all flex items-center gap-1" to="/dashboard?tab=timeline">
              <FontAwesomeIcon size="sm" icon={faHouse} />
                <span>Home</span>
              </Link>

              <Link onClick={()=> isOpen(false)} className="bg-white text-blkblue hover:bg-fluo hover:text-black px-2 py-2  rounded-lg  transition-all flex items-center gap-1 "  to="/dashboard?tab=messages">
                <FontAwesomeIcon size="sm" icon={faInbox} />        
                <span>Inbox</span>      
              </Link>

              <Link onClick={()=> isOpen(false)} className="bg-white text-blkblue hover:bg-fluo hover:text-black px-2 py-2  rounded-lg  transition-all flex items-center gap-1 "  to="/dashboard?tab=parameters">
              <FontAwesomeIcon size="sm" icon={faGear} />
                <span>Parameters</span>
              </Link>
            </div>

         </div>

       </div> 

       {/*link*/}
        <div className="pt-20 md:pt-0 justify-center md:justify-normal w-full md:w-fit text-opacity-80 text-white flex  md:-mt-3 gap-7 md:gap-2 md:text-neutral-700 md:underline text-lg font-bold md:font-normal md:text-[.5rem] capitalize md:normal-case">
          <Link to="https://github.com/Ocece77" className="hover:scale-105 transition-all text-gradient-animation">
            my github</Link>
           <Link to="https://github.com/Ocece77/bam_social_app"  className="hover:scale-105 transition-all">project documentation</Link>
        </div>


        <div className="md:hidden w-full text-center text-sm text-red-800 ">
          <button className="hover:text-red-700 transition-all">
            <FontAwesomeIcon onClick={logOut} icon={faRightFromBracket} className="pe-1" />
            LogOut
            </button>
        </div>
    
      </div>


    </div>

    </>
  )
}

export default LeftSidebar