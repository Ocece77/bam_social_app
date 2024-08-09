import React, {  ReactElement, useEffect, useState } from "react"
import Paramaters from "./Parameters"
import Error from "../public_page/Error"
import Profil from "./Profil"
import FollowersList from "./FollowersList"
import FollowingList from "./FollowingList"
import Timeline from "./Timeline"
import { useLocation } from "react-router-dom"
import LeftSidebar from "../components/LeftSideBar"
import Messages from "./Messages"


const Dashboard: React.FC =()=>{
 const location = useLocation();
 const [currTab , setCurrTab] = useState<string>("")
 const [colSpan , setColSpan] = useState<string>("")
 useEffect(()=>{
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get('tab')
  if (tab){
   setCurrTab(tab)
   if (tab == 'timeline' ||tab == 'messages' ){
    setColSpan("col-span-3")
   } else{
    setColSpan("col-span-4 ")
   }
  }
 }, [location.search])


 const outletContent = () :ReactElement=>{

  switch(currTab){
    case "timeline":
      return <Timeline/>
     case "profil":
      return <Profil/>
     case "followersList":
       return <FollowersList/>
     case "followingList":
       return <FollowingList/>  
     case 'messages':
      return <Messages/>  
     case "parameters":
        return <Paramaters/>
    
    default:
      return <Error/>
  }

 }

  return(
    <>
    
    <div className="grid md:grid-cols-5 overflow-hidden w-full">

    <div className="col-span-1">
     <LeftSidebar/>
    </div>

    <div className={`${colSpan} py-10 px-6 md:ps-12 lg:ps-20 md:pe-20 w-full `}>
      {outletContent()}
    </div>

    </div>

    </>
  )
}

export default Dashboard 