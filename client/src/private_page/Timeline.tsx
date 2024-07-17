import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import defaultpic from "../assets/defaultuser.png";


const Timeline: React.FC =()=>{
  const {currUser} = useSelector((state : RootState) => state.user)

  return(
    <>
     <div className="flex flex-col gap-2 ps-0 md:ps-40 lg:ps-24">
      {/*post form */}
      <div>
        <div className="flex rounded-lg bg-neutral-400 bg-opacity-10 h-1/6 px-6 py-3 ">

          <div className="flex items-center h-full justify-center">
           <img src={currUser.profilpicture ? currUser.profilpicture : defaultpic} alt="userpicture" className="w-16 md:w-16 rounded-full border border-fluo p-1 mb-4"/>
          </div>

          <form className=" flex flex-col gap-2 w-full ps-5">
            <input type="text" name="content" id="content" className="w-full bg-neutral-500 bg-opacity-30 rounded-lg py-2 px-2 text-white placeholder:text-sm" placeholder="What's happening ?"/>
              <div className="flex justify-end">
               <button type="submit" className="bg-fluo font-pixelify w-fit px-3 rounded hover:bg-blue-900 hover:text-white transition-all">bam it</button>
              </div>
          </form>


        </div>


      </div>

     </div>
    </>
  )
}

export default Timeline