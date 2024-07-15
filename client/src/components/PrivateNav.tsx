
import { Link  } from "react-router-dom";

const PrivateNav :React.FC=()=>{
  return(
    <>
    <nav className="flex justify-between px-4 py-3">
      <div>
      <h1 className="text-3xl bg-fluo w-fit px-2 rounded-xl font-pixelify">bam</h1>
      </div>
      <div className="flex gap-3 font-thin text-white">
        <Link to="/login">Login</Link>
        <p>Sign Up</p>
      </div>

    </nav>
    </>
  )
}

export default PrivateNav ;
