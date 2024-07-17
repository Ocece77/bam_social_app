
import { Link, useLocation  } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faGrip, faHouse, faInbox, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { NavContext } from "../utils/context/Context";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/userSlice";

const PrivateNav :React.FC =()=> {

  const dispatch =useDispatch()

  {/*nav open */}
   const context = useContext(NavContext)
   if(!context){
    throw new Error("There's no context")
   }
   const { open, isOpen } = context;
   const location = useLocation()
   const [tab, setTab] = useState<string>("")

  {/*logout*/}

  const logOut = () => {
    dispatch(logoutSuccess())
   }

  useEffect(()=> {
    const searchParams = new URLSearchParams(location.search)
    const url = searchParams.get("tab")
    if(url){
      setTab(url)
    }
  } , [location.search])

  return(
    <>
    <nav className="flex justify-between px-4 py-4 items-center">
  {/* logo and icon for opening th enav sidebar */}
      <div className="flex md:gap-3 items-center justify-between md:justify-normal w-full">
         <Link to="/dashboard?tab=timeline" className="h-fit text-3xl bg-fluo w-fit px-2 rounded-xl font-pixelify ">bam</Link>
          <button onClick={()=> isOpen(!open)} className="ps-4 py-3 md:hidden ">
            <FontAwesomeIcon icon={faGrip} size="2xl" className="hover:scale-125 transition-all active:scale-90" style={{color: "#B6FF00"}} />
          </button>
      </div>

  {/* pages */}
      <div className="hidden md:flex gap-3 font-thin text-white">
       
       <Link className={`${tab ==  "timeline" ? "bg-white text-black":""} hover:bg-fluo hover:text-black px-2 rounded-xl transition-all flex items-center gap-1 `} to="/dashboard?tab=timeline">
          <FontAwesomeIcon size="sm" icon={faHouse} />
          <span>Home</span>
        </Link>

        <Link className={`${tab ==  "messages" ? "bg-white text-black":""} hover:bg-fluo hover:text-black px-1 rounded-xl transition-all flex items-center gap-1 `}  to="/dashboard?tab=messages">
         <FontAwesomeIcon size="sm" icon={faInbox} />        
        </Link>

       <Link className={`${tab ==  "parameters" ? "bg-white text-black":""} hover:bg-fluo hover:text-black px-1 rounded-xl transition-all flex items-center gap-1 `}  to="/dashboard?tab=parameters">
          <FontAwesomeIcon size="sm" icon={faGear} />
        </Link>
        

     {/* log out */}
      <button  onClick={logOut} className=" w-full text-center text-sm hover:text-red-700 transition-all px-1">
         <FontAwesomeIcon icon={faRightFromBracket} />
       </button>
  
      </div>

    </nav>
    </>
  )
}

export default PrivateNav