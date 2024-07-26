import Footer from "./components/Footer";
import PublicNav from "./components/PublicNav";
import Homepage from "./public_page/Homepage"
import { Routes, Route, Outlet } from 'react-router-dom';
import Sign from "./public_page/Sign";
import Login from "./public_page/Login";
import Dashboard from "./private_page/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Error from "./public_page/Error";
import PrivateNav from "./components/PrivateNav";
import { NavProvider } from "./utils/context/Context";



const PublicLayout =  () =>{
  return (
    <>
    <PublicNav/>
     <Outlet/>
     <Footer/>
    </>
  
  )
}

const PrivateLayout =  () =>{
  return (
    <>
    <PrivateNav/>
    <Outlet/>
    </>
  
  )
}
const App : React.FC =() =>{



  return (
   <>
   <NavProvider>
    <Routes>
    
     {/*publi page */}
     <Route path="/" element={<PublicLayout/>}>
       <Route index element ={<Homepage/>}/>
       <Route path="login" element ={<Login/>}/>
       <Route path="sign" element ={<Sign/>}/>
     </Route>
  
     {/*private page */}
      <Route path="/dashboard" element={<PrivateRoute/>}>
         <Route element={<PrivateLayout/>}>
            <Route index element={<Dashboard/>}/> 
          </Route>
      </Route>

      <Route path="*" element={<Error/>}/> {/*error page*/}

     </Routes>
   </NavProvider>
 </>
  )
}

export default App
