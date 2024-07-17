
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link  } from "react-router-dom";
import { logoutSuccess } from "../redux/userSlice";
import { RootState } from "../redux/store";

const PublicNav :React.FC =()=>{
  const state = useSelector((state : RootState) => state.user)
  const dispatch =useDispatch()
  const logOut = () => {
   dispatch(logoutSuccess())
  }

  return(
    <>
    <nav className="flex justify-between px-4 py-4 items-center">
      <div className="animate-slide-in-reverse hover:scale-110 transition-all">
      <Link to="/" className="text-3xl bg-fluo w-fit px-2 rounded-xl font-pixelify ">bam</Link>
      </div>
      <div className=" animate-slide-in flex gap-3 font-thin text-white">
      {  state.currUser == null &&  
      <>
       <Link className="hover:text-fluo transition-all" to="/login">Login</Link>
        <Link className="hover:text-fluo transition-all" to="/sign">Sign Up</Link>
        </>
        }

        { state.currUser && <>
          <Link className="hover:text-fluo transition-all" to="/dashboard?tab=timeline">Dashboard</Link>
         <button onClick={logOut} className="hover:text-fluo transition-all" >Log Out</button>
        </>
        }
      </div>

    </nav>
    </>
  )
}

export default PublicNav