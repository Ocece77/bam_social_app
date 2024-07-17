import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../redux/store";


const PrivateRoute: React.FC =()=>{
  const state = useSelector((state :RootState) => state.user)
  return state.currUser ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute;