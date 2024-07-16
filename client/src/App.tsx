import Footer from "./components/Footer";
import PublicNav from "./components/PublicNav";
import Homepage from "./public_page/Homepage"
import { Routes, Route } from 'react-router-dom';
import Sign from "./public_page/Sign";
import Login from "./public_page/Login";


const App : React.FC =() =>{


  return (
    <>
 <PublicNav/>
    <Routes>
      <Route path="/" element ={<Homepage/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/sign" element ={<Sign/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
