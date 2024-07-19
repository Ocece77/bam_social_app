import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import defaultpic from "../assets/defaultuser.png";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from 'react';


const Timeline: React.FC =()=>{
  const {currUser} = useSelector((state : RootState) => state.user)


  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0]); // Handle the file 
    }
  };


  if (!currUser) {
    return null; // ou une autre interface utilisateur si l'utilisateur n'est pas connecté
  }

  return(
    <>
     <div className="flex flex-col gap-2 ps-0 md:ps-40 lg:ps-24">
      {/*post form */}
      <div>
        <div className="flex rounded-lg bg-neutral-400 bg-opacity-10 h-1/6 px-6 py-3 ">

          <div className="flex items-center h-full justify-center">
           <img
            src={currUser.profilpicture ? currUser.profilpicture : defaultpic}  alt="userpicture"  className="w-16 md:w-16 rounded-full border border-fluo p-1 mb-4"/>
          </div>

          <form className="flex flex-col gap-2 w-full ps-5">
              <input type="text" name="content" id="content" className="w-full bg-neutral-500 bg-opacity-30 rounded-lg py-2 px-2 text-white placeholder:text-sm" placeholder="What's happening ?"/>

              <div className="flex justify-between">
                <div className="flex items-center" >
                  <FontAwesomeIcon icon={faImage} style={{color: "#ffffff",}} />
                  <div className="flex items-center">
                      <input type="file"ref={fileInputRef}  onChange={handleFileChange} className="hidden"/>
                      <button onClick={handleClick} className="text-white text-[.7rem] px-1 font-bold hover:text-fluo transition-all" >
                        Choisir un fichier
                      </button>
                    </div>    
                  </div>

                <div className="flex justify-end pe-3">
                    <button type="submit" className="bg-fluo font-pixelify w-fit px-3 rounded hover:bg-blue-900 hover:text-white transition-all">bam it</button>
                </div>
              </div>
            </form>


        </div>


      </div>

       {/*post list */}



     </div>
    </>
  )
}

export default Timeline