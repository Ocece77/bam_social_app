import gif from "../assets/3dthree.gif"
import heart from "../assets/heart.png"
import create from "../assets/create.gif"
import chat from "../assets/chat.png"
import stickers from "../assets/stickers2.png"
import { Link } from "react-router-dom"

const Homepage: React.FC =()=>{
  return(
    <>

    <div className="pt-20 md:pt-40 h-fit">

            <div>
              <div className="text-center rounded-lg relative">
                 <img src={gif} alt='gif' className="absolute -z-0 w-28 -top-20 right-0 md:-top-20 md:left-4 md:w-40 " />
                  {/*Illustration by Marina Mogulska from Ouch!*/}
                    <h1 className=" animate-slide-in text-[5rem] md:text-[5rem] lg:text-[6.2rem] relative leading-[3.4rem] md:leading-[4rem] lg:leading-[4.6rem] text-white uppercase font-extrabold md:px-5">POST YOUR <span className="text-fluo">BAM</span> AND MAKE NEW <span className="text-fluo">FRIENDS</span> </h1>
                    <img src={stickers} alt="bam stickers" className="  absolute w-28 top-18 md:top-24  md:right-2 md:w-40 lg:top-20 lg:w-56 lg:right-20 rounded-full animate-spin-slow" />
               </div>
            </div>

            <div className="w-fit mt-28 md:mt-20 mx-auto">
              <Link to="/sign" className="text-lg rounded border border-white text-white font-light w-fit px-2 py-1 hover:border-blue-700 hover:text-blue-700 transition-all">Post your first bam right now</Link>
            </div>

          <div className="h-full w-full pt-10">

            <div className="grid grid-cols-3 gap-2 h-fit p-2  w-full bg-neutral-100 rounded-t-3xl">

              <div className="rounded-3xl bg-neutral-200 text-center py-4 bg-opacity-40 ">
                <div className="grid grid-rows-2">
                 <p className="font-extrabold text-sm md:text-xl">SHARE WITH YOUR FRIENDS</p>
                 <p className="font-thin text-[.7rem] md:text-lg">Stay in touch with your friends </p>
                </div>

                <div className="w-full flex justify-center">
                <img src={chat} alt="heart" className="w-48 pt-4" />
               </div>
              </div>

              <div className="rounded-3xl bg-neutral-200 text-center py-4 bg-opacity-40 ">
                <div className="grid grid-rows-2">
                 <p className="font-extrabold text-sm md:text-xl">CREATE A COMMUNITY</p>
                 <p className="font-thin text-[.7rem] md:text-lg">Create and connected with the community </p>
                </div>

                <div className="w-full flex justify-center">
                <img src={create} alt="heart"  className="w-52"/>
               </div>
                
              </div>
               

              <div className="rounded-3xl bg-neutral-200 text-center py-4 bg-opacity-40 ">
                <div className="grid grid-rows-2">
                 <p className="font-extrabold text-sm md:text-xl">FOLLOW THE TREND</p>
                 <p className="font-thin text-[.7rem] md:text-lg">Follow all the trends and be trendy</p>
                </div>

               <div className="w-full flex justify-center">
                <img src={heart} alt="heart"  className="w-48 pt-4"/>
               </div>
              </div>
               
               
            </div>
          </div>
     

          
    </div>
  
    </>
  )
}

export default Homepage