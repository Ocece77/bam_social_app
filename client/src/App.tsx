import Footer from "./components/Footer";
import PublicNav from "./components/PublicNav";
import Homepage from "./public_page/Homepage"
import { Routes, Route } from 'react-router-dom';


const App : React.FC =() =>{


  return (
    <>
 <PublicNav/>
    <Routes>
      <Route path="/" element ={<Homepage/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
