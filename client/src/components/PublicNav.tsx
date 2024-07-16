
import { Link  } from "react-router-dom";

const PublicNav :React.FC =()=>{
  return(
    <>
    <nav className="flex justify-between px-4 py-4 items-center">
      <div className="animate-slide-in-reverse hover:scale-110 transition-all">
      <Link to="/" className="text-3xl bg-fluo w-fit px-2 rounded-xl font-pixelify ">bam</Link>
      </div>
      <div className=" animate-slide-in flex gap-3 font-thin text-white">
        <Link className="hover:text-fluo transition-all" to="/login">Login</Link>
        <Link className="hover:text-fluo transition-all" to="/sign">Sign Up</Link>
      </div>

    </nav>
    </>
  )
}

export default PublicNav